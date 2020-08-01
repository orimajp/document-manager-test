import { computed, onMounted, ref } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import { useRouter } from '~/hooks/useRouter'
import { IDocument } from '~/models/document/IDocument'
import { INode } from '~/models/node/INode'
import { IPage } from '~/models/page/IPage'
import { usePage } from '~/hooks/usePage'
import { useDocument } from '~/hooks/useDocument'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

export const useTreeEditor = () => {
  const { route, router } = useRouter()
  const pageId = route.value.params.key
  console.log(`pageId=${pageId}`)

  const document = ref<IDocument>({
    documentId: '',
    documentTitle: '',
    createdAt: '',
    updatedAt: '',
    node: {
      pageId: '',
      pageTitle: '',
      nodes: []
    } as INode
  })
  const page = ref<IPage>({
    documentId: '',
    pageId: '',
    pageTitle: '',
    pageData: '',
    createdAt: '',
    updatedAt: ''
  })

  const treeNodes = computed<Array<INode>>({
    get: () => document.value.node.nodes,
    set: (value) => (document.value.node.nodes = value)
  })
  const pageTitle = computed(() => document.value.documentTitle)
  const currentPageId = computed(() => page.value.pageId)

  const { getPage } = usePage()
  const { getDocument, updateDocumentNode } = useDocument()
  getPage(pageId).then((editPage) => {
    page.value = editPage
    getDocument(page.value.documentId).then((editDocument) => {
      document.value = editDocument
    })
  })

  const registerTree = async () => {
    await updateDocumentNode(
      document.value.documentId,
      document.value.node.nodes
    )
    await gotoView()
  }

  const gotoView = async () => {
    await router.push(`/document/view/${currentPageId.value}`)
  }

  const cancelTree = async () => {
    await gotoView()
  }

  const widownHeight = ref(0)
  const editAreaHeight = computed(() => widownHeight.value - ADJUST_HEIGHT)
  const calculateWindowWidth = () => (widownHeight.value = window.innerHeight)
  useEventListener('resize', calculateWindowWidth)
  onMounted(() => (widownHeight.value = window.innerHeight))

  return {
    treeNodes,
    pageTitle,
    currentPageId,
    registerTree,
    cancelTree,
    editAreaHeight
  }
}
