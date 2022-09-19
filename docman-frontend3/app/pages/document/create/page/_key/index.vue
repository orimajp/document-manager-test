<script setup lang="ts">
import { computed, useRoute, useRouter } from '@nuxtjs/composition-api'
import DocumentEditorCreateFooter from '~/components/create/DocumentEditorCreateFooter.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer.vue'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import TreeEditDialog from '~/components/create/TreeEditDialog.vue'
import EditStateContainer from '~/containers/edit-state-container'
import { useEditorPaneColumn } from '~/composables/edit/use-editor-pane-column'
import DisplayModeContainer from '~/containers/display-mode-container'
import { useTreeEditDialogControll } from '~/composables/create/use-tree-edit-daialog-controll'
import { useCreateData } from '~/composables/create/use-create-data'
import { useRegisterPage } from '~/composables/create/use-register-page'
import { useBeforeUnloadConfirm } from '~/composables/edit/use-before-unload-confirm'
const router = useRouter()

const route = useRoute()

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
//  closeDialog
} = useTreeEditDialogControll()

/*
const closeEditDialog = () => {
  closeDialog()
}
*/

const { registerNewPage } = useRegisterPage(openDialog)

const registerPage = () => {
  registerNewPage(
    pageId,
//    title.value,
    documentTitle.value,
//    data.value,
    documentData.value,
    prevendChildTargetId,
    appendNextTargetId
  )
}

const { change, savePage } = EditStateContainer.useContainer()
const { title: documentTitle, data: documentData, page, updateTitle, updatePageData } = useCreateData(
  change
)

// const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
const { editMode, prevMode } = DisplayModeContainer.useContainer()
const displayEditForm = computed(() => !prevMode.value)
const displayPreviewArea = computed(() => !editMode.value)

const {
  displayEditFormCols,
  displayPreviewAreaCols
} = useEditorPaneColumn()

const cancelPage = () => {
  router.push(`/document/view/${pageId}`)
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
