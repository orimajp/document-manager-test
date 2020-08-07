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
      @registerDocumentPage="registerPage"
      @cancelDocument="cancelPage"
    />
    <tree-edit-dialog
      :tree-edit-dialog-controll-menu="treeEditDialogControllMenu"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import TreeEditDialog from '~/components/create/TreeEditDialog.vue'
import { useRouter } from '~/hooks/useRouter'
import EditStateContainer from '~/containers/EditStateContainer'
import { useEditorPaneColumn } from '~/hooks/edit/editorPaneColumnHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import { useTreeEditDialogControll } from '~/hooks/create/treeEditDialogControllHook'
import { useCreateData } from '~/hooks/create/createDataHook'
import { useRegisterPage } from '~/hooks/create/registerPageHook'
import { useBeforeUnloadConfirm } from '~/hooks/edit/beforeUnloadConfirmHook'

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
    const prevendChildTargetId = route.value.query.prevendChildTargetId
      ? (route.value.query.prevendChildTargetId as string)
      : null
    const appendNextTargetId = route.value.query.appendNextTargetId
      ? (route.value.query.appendNextTargetId as string)
      : null

    const {
      treeEditDialogControllMenu,
      openDialog,
      closeDialog
    } = useTreeEditDialogControll()

    const closeEditDialog = () => {
      closeDialog()
    }

    const { registerNewPage } = useRegisterPage(openDialog)

    const registerPage = () => {
      registerNewPage(
        pageId,
        title.value,
        data.value,
        prevendChildTargetId,
        appendNextTargetId
      )
    }

    const { change, savePage } = EditStateContainer.useContainer()
    const { title, data, page, updateTitle, updatePageData } = useCreateData(
      change
    )

    const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
    const displayEditForm = computed(() => !prevMode.value)
    const displayPreviewArea = computed(() => !editMode.value)

    const {
      displayEditFormCols,
      displayPreviewAreaCols
    } = useEditorPaneColumn()

    const cancelPage = () => {
      router.push('/')
    }

    const goTop = () => {
      router.push('/')
    }

    useBeforeUnloadConfirm(change, savePage)

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
