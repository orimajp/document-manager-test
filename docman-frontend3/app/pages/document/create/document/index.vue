<script setup lang="ts">
import { computed, useRouter } from '@nuxtjs/composition-api'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import EditStateContainer from '~/containers/edit-state-container'
import { useDocument } from '~/composables/use-document'
import { useEditorPaneColumn } from '~/composables/edit/use-editor-pane-column'
import DisplayModeContainer from '~/containers/display-mode-container'
import { useCreateData } from '~/composables/create/use-create-data'
import { useBeforeUnloadConfirm } from '~/composables/edit/use-before-unload-confirm'

const { change, savePage } = EditStateContainer.useContainer()

const { title: documentTitle , data: documentData , page, updateTitle, updatePageData } = useCreateData(
  change
)

// const documentTitle = computed(() => title.value)
// const documentData = computed(() => data.value)

//    const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
const { editMode, prevMode } = DisplayModeContainer.useContainer()
const displayEditForm = computed(() => !prevMode.value)
const displayPreviewArea = computed(() => !editMode.value)

const {
  displayEditFormCols,
  displayPreviewAreaCols
} = useEditorPaneColumn()

const router = useRouter()
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
</script>

<script lang="ts">
export default {
  layout: 'editor'
}
</script>

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
