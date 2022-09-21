<script setup lang="ts">
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api'
// @ts-ignore
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
// @ts-ignore
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import { usePage } from '~/composables/use-page'
import { useEditorPaneColumn } from '~/composables/edit/use-editor-pane-column'
// @ts-ignore
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import DisplayModeContainer from '~/containers/display-mode-container'
import EditStateContainer from '~/containers/edit-state-container'
// @ts-ignore
import DocumentEditorFooter from '~/components/edit/DocumentEditorFooter.vue'
import { useUpdateData } from '~/composables/edit/use-update-data'
import { useBeforeUnloadConfirm } from '~/composables/edit/use-before-unload-confirm'

const router = useRouter()
const route = useRoute()

const pageId = route.value.params.key
const { change, savePage } = EditStateContainer.useContainer()
const {
  page,
  pageTitle,
  pageData,
  documentEdit,
  updateTitle,
  updatePageData
} = useUpdateData(pageId, change)

const { editMode, prevMode } = DisplayModeContainer.useContainer()
const displayEditForm = computed(() => !prevMode.value)
const displayPreviewArea = computed(() => !editMode.value)

const {
  displayEditFormCols,
  displayPreviewAreaCols
} = useEditorPaneColumn()

const { updatePage } = usePage()
const updateDocumentPage = () => {
  savePage.value = true
  updatePage(page.value).then(() => {
    router.push(`/document/view/${page.value.pageId}`)
  })
}

const cancelDocumentPage = () => {
  router.push(`/document/view/${page.value.pageId}`)
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
      :page-title="pageTitle"
      :document-edit="documentEdit"
      :create-mode="false"
      @goTop="goTop"
      @updateTitle="updateTitle"
    />
    <v-row class="content-area">
      <v-col v-show="displayEditForm" :cols="displayEditFormCols">
        <markdown-editor
          :markdown-data="pageData"
          :edit-mode="true"
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
    <document-editor-footer
      @updateDocument="updateDocumentPage"
      @cancelDocument="cancelDocumentPage"
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
