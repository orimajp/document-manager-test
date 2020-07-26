<template>
  <div>
    <document-editor-navbar
      :page-title="pageTitle"
      :document-edit="documentEdit"
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
      @updateDocument="cancelDocumentPage"
      @cancelDocument="updateDocumentPage"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import MarkdownEditor from '~/components/editor/MarkdownEditor.vue'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer'
import { useRouter } from '~/hooks/useRouter'
import { usePage } from '~/hooks/usePage'
import { useEditorPaneColumn } from '~/hooks/edit/editorPaneColumnHook'
import { PageData } from '~/models/page/PageData'
import DocumentEditorNavbar from '~/components/edit/DocumentEditorNavbar.vue'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import EditStateContainer from '~/containers/EditStateContainer'
import DocumentEditorFooter from '~/components/edit/DocumentEditorFooter.vue'

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

export default defineComponent({
  layout: 'editor',
  components: {
    DocumentEditorNavbar,
    MarkdownEditor,
    DocumentPreviewer,
    DocumentEditorFooter
  },
  setup() {
    const { route } = useRouter()
    const pageId = route.value.params.key
    console.log(`pageId=${pageId}`)

    const { getPage } = usePage()
    const page = ref(null) as Ref<PageData>
    const pageTitle = computed(() => {
      return page.value === null ? ref('') : page.value.pageTitle
    })
    const pageData = computed(() => {
      return page.value === null ? ref('') : page.value.pageData
    })
    const documentEdit = computed(() => {
      return page.value === null
        ? ref(true)
        : page.value.pageId === page.value.documentId
    })
    getPage(pageId).then((editPageData) => (page.value = editPageData))

    const { editMode, dualMode, prevMode } = DisplayModeContainer.useContainer()
    const displayEditForm = computed(() => !prevMode)
    const displayPreviewArea = computed(() => !editMode)

    const {
      displayEditFormCols,
      displayPreviewAreaCols
    } = useEditorPaneColumn()

    const { change, savePage } = EditStateContainer.useContainer()
    const { updatePage } = usePage()
    const { router } = useRouter()

    const updateTitle = (updateTitle) => {
      change.value = true
      page.value.pageTitle = updateTitle
    }
    const updatePageData = (updatePageData) => {
      change.value = true
      page.value.pageData = updatePageData
    }

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
      pageData,
      pageTitle,
      documentEdit,
      displayEditForm,
      displayPreviewArea,
      dualMode,
      displayEditFormCols,
      displayPreviewAreaCols,
      updateTitle,
      updatePageData,
      updateDocumentPage,
      cancelDocumentPage,
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
