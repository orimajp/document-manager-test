<template>
  <div>
    <document-editor-navbar
      :page-title="documentTitle"
      :document-edit="false"
      :create-mode="true"
      @goTop="goTop"
      @updateTitle="updateTitle"
    />
    <v-row class="content-area">
      <v-col v-show="displayEditForm" :cols="displayEditFormCols">
        <markdown-editor
          :markdown-data="documentData"
          :edit-mode="false"
          class="fixed-content"
          @updatePageData="updatePageData"
        />
      </v-col>
      <v-col
        v-show="displayPreviewArea"
        :cols="displayPreviewAreaCols"
        class="preview-area"
      >
        <document-previewer :page-content="page" />
      </v-col>
    </v-row>
    <document-editor-create-footer
      :document-edit="true"
      @registerDocument="registerPage"
      @cancelDocument="cancelPage"
    />
    <tree-edit-dialog
      :tree-edit-dialog-controll-menu="treeEditDialogControllMenu"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import TreeEditDialog from '~/components/create/TreeEditDialog.vue'
import { useRouter } from '~/hooks/useRouter'
import EditStateContainer from '~/containers/EditStateContainer'
import { useEditorPaneColumn } from '~/hooks/edit/editorPaneColumnHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import { usePage } from '~/hooks/usePage'
import { useTreeEditDialogControll } from '~/hooks/create/treeEditDialogControllHook'
import { useCreateDataHook } from '~/hooks/create/createDataHook'

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

export default defineComponent({
  layout: 'editor',
  components: {
    DocumentEditorNavbar,
    MarkdownEditor,
    DocumentPreviewer,
    DocumentEditorCreateFooter,
    TreeEditDialog
  },
  setup() {
    const { route, router } = useRouter()
    const pageId = route.value.params.key

    const pageFunc = usePage()
    let documentId
    pageFunc.getPage(pageId).then((document) => {
      documentId = document.documentId
    })

    /*
    const prevendChildTargetId = route.value.query.prevendChildTargetId
      ? route.value.query.prevendChildTargetId
      : null
    const appendNextTargetId = route.value.query.appendNextTargetId
      ? route.value.query.appendNextTargetId
      : null
     */

    const {
      treeEditDialogControllMenu,
      openDialog,
      closeDialog
    } = useTreeEditDialogControll()

    const closeEditDialog = () => {
      closeDialog()
    }

    const { change, savePage } = EditStateContainer.useContainer()
    const {
      title,
      data,
      page,
      updateTitle,
      updatePageData
    } = useCreateDataHook(change)

    const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
    const displayEditForm = computed(() => !prevMode.value)
    const displayPreviewArea = computed(() => !editMode.value)

    const {
      displayEditFormCols,
      displayPreviewAreaCols
    } = useEditorPaneColumn()
    const registerPage = () => {
      pageFunc
        .registerPage(documentId, title.value, data.value)
        .then((data) => {
          openDialog(data.pageId)
        })
    }

    const cancelPage = () => {
      router.push('/')
    }

    const goTop = () => {
      router.push('/')
    }

    useEventListener('beforeunload', (event: BeforeUnloadEvent) => {
      if (change.value && !savePage.value) {
        event.preventDefault()
        // ここのメッセージはブラウザ依存
        event.returnValue = LEAVE_CONFIRM_MESSAGE
      }
    })

    // FIXME 現状、Vue Composition APIにおいて、Vue-Routerによる画面遷移をガードする手段は無いっぽい

    return {
      page,
      documentTitle: title,
      documentData: data,
      displayEditForm,
      displayPreviewArea,
      dualMode,
      displayEditFormCols,
      displayPreviewAreaCols,
      treeEditDialogControllMenu,
      updateTitle,
      updatePageData,
      registerPage,
      cancelPage,
      goTop,
      closeEditDialog
    }
  }
})
</script>

<style scoped>
.content-area {
  margin-top: 50px;
  margin-bottom: 50px;
}
.fixed-content {
  top: 48px;
  position: fixed;
  z-index: 2;
}
.preview-area {
  padding-left: 0;
  padding-right: 0;
}
</style>
