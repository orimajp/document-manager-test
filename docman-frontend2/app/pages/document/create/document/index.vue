<template>
  <div>
    <document-editor-navbar
      :page-title="documentTitle"
      :document-edit="true"
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
      @registerDocument="registerDocument"
      @cancelDocument="cancelDocument"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import { useRouter } from '~/hooks/useRouter'
import EditStateContainer from '~/containers/EditStateContainer'
import { PageData } from '~/models/page/PageData'
import { useDocument } from '~/hooks/useDocument'
import { useEditorPaneColumn } from '~/hooks/edit/editorPaneColumnHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

export default defineComponent({
  layout: 'editor',
  components: {
    DocumentEditorNavbar,
    MarkdownEditor,
    DocumentPreviewer,
    DocumentEditorCreateFooter
  },
  setup() {
    const page = ref({
      documentId: '',
      pageId: '',
      pageTitle: '',
      pageData: '',
      createdAt: '',
      updatedAt: ''
    }) as Ref<PageData>
    const documentTitle = computed(() => page.value.pageTitle)
    const documentData = computed(() => page.value.pageData)

    const { change, savePage } = EditStateContainer.useContainer()

    const updateTitle = (updateTitle) => {
      change.value = true
      page.value.pageTitle = updateTitle
    }
    const updatePageData = (updatePageData) => {
      change.value = true
      page.value.pageData = updatePageData
    }

    const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
    const displayEditForm = computed(() => !prevMode.value)
    const displayPreviewArea = computed(() => !editMode.value)

    const {
      displayEditFormCols,
      displayPreviewAreaCols
    } = useEditorPaneColumn()

    const { router } = useRouter()
    const documentFunc = useDocument()
    const registerDocument = () => {
      documentFunc
        .registerDocument(documentTitle.value, documentData.value)
        .then((data) => {
          router.push(`/document/view/${data.documentId}`)
        })
    }

    // const registerPage = () => {}

    const cancelDocument = () => {
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
      documentTitle,
      documentData,
      displayEditForm,
      displayPreviewArea,
      dualMode,
      displayEditFormCols,
      displayPreviewAreaCols,
      updateTitle,
      updatePageData,
      registerDocument,
      // registerPage
      cancelDocument,
      goTop
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
