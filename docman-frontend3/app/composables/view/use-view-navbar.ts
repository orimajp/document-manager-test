import { computed, useRouter } from '@nuxtjs/composition-api'
import DrawerContainer from '~/containers/drawer-container'
import PageContainer from '~/containers/page-container'
import DocumentContainer from '~/containers/document-container'

export const useViewNavbar = () => {
  const { drawer } = DrawerContainer.useContainer()
  const openDrawer = () => {
    drawer.value = true
  }

  const { page } = PageContainer.useContainer()
  const pageTitle = computed(() => page.value.pageTitle)
  const pageId = computed(() => page.value.pageId)
  const documentId = computed(() => page.value.documentId)

  const { document } = DocumentContainer.useContainer()
  const documentNodes = computed(() => document.value.node.nodes)
  const canTreeEdit = computed(() => {
    if (!documentNodes.value) {
      return false
    }
    if (documentNodes.value.length > 1) {
      return true
    }
    return (
      documentNodes.value.length === 1 &&
      documentNodes.value[0].nodes.length > 0
    )
  })

  const router = useRouter()
  const goTop = () => {
    return router.push('/')
  }
  const goPageCreate = () => {
    return router.push(`/document/create/page/${pageId.value}`)
  }
  const goPageEdit = () => {
    return router.push(`/document/edit/${pageId.value}`)
  }
  const goTreeEdit = () => {
    return router.push(`/document/tree/${pageId.value}`)
  }

  return {
    openDrawer,
    pageTitle,
    pageId,
    documentId,
    canTreeEdit,
    goTop,
    goPageCreate,
    goPageEdit,
    goTreeEdit
  }
}
