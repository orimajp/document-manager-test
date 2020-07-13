import { computed } from '@vue/composition-api'
import DrawerContainer from '~/containers/DrawerContainer'
import PageContainer from '~/containers/PageContainer'
import useRouter from '~/hooks/useRouter'
import DocumentContainer from '~/containers/DocumentContainer'

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
  const canTreeEdit = () => {
    if (documentNodes.value.length > 1) {
      return true
    }
    return (
      documentNodes.value.length === 1 &&
      documentNodes.value[0].nodes.length > 0
    )
  }

  const { router } = useRouter()
  const goTop = () => {
    router.push('/')
  }
  const goPageCreate = () => {
    router.push(`/document/create/page/${pageId}`)
  }
  const goPageEdit = () => {
    router.push(`/document/edit/${pageId}`)
  }
  const goTreeEdit = () => {
    router.push(`/document/tree/${pageId}`)
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
