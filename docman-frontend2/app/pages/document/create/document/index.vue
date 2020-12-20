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
      @registerDocumentPage="registerDocument"
      @cancelDocument="cancelDocument"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import { useRouter } from '~/hooks/useRouter'
import EditStateContainer from '~/containers/EditStateContainer'
import { useDocument } from '~/hooks/useDocument'
import { useEditorPaneColumn } from '~/hooks/edit/editorPaneColumnHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import { useCreateData } from '~/hooks/create/createDataHook'
import { useBeforeUnloadConfirm } from '~/hooks/edit/beforeUnloadConfirmHook'

export default defineComponent({
  components: {
    DocumentEditorNavbar,
    MarkdownEditor,
    DocumentPreviewer,
    DocumentEditorCreateFooter
  },
  layout: 'editor',
  setup() {
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

    const { router } = useRouter()
    const documentFunc = useDocument()
    const registerDocument = () => {
      documentFunc.registerDocument(title.value, data.value).then((data) => {
        router.push(`/document/view/${data.documentId}`)
      })
    }

    const cancelDocument = () => {
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
      updateTitle,
      updatePageData,
      registerDocument,
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
