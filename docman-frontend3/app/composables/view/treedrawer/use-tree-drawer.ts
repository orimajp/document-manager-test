import { computed, useRouter } from '@nuxtjs/composition-api'
import PageContainer from '~/containers/page-container'
import DocumentContainer from '~/containers/document-container'

export const useTreeDrawer = () => {
  const { document } = DocumentContainer.useContainer()
  const { page } = PageContainer.useContainer()

  const documentId = computed(() => document.value.documentId)

  const pageId = computed(() => page.value.pageId)

  const currentNode = computed(() => document.value.node)

  const pageIdArray = [] as Array<string> // リアクティブにしない

  const documentSelected = computed(
    () => currentNode.value.pageId === page.value.pageId
  )

  const pageTitle = computed(() => currentNode.value.pageTitle)

  const router = useRouter()
  const goDocumentTop = () => {
    return router.push(`/document/view/${documentId.value}`)
  }

  return {
    documentId,
    pageId,
    currentNode,
    pageIdArray,
    documentSelected,
    pageTitle,
    goDocumentTop
  }
}
