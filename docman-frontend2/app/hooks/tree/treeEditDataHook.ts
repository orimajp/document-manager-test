import { computed, ref } from '@vue/composition-api'
import { useDocument } from '~/hooks/useDocument'
import { usePage } from '~/hooks/usePage'
import { INode } from '~/models/node/INode'
import { IPage } from '~/models/page/IPage'
import { IDocument } from '~/models/document/IDocument'

export const useTreeEditData = () => {
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

  const { getPage } = usePage()
  const { getDocument, updateDocumentNode } = useDocument()

  const fetchTreeData = (pageId: string) => {
    getPage(pageId).then((editPage) => {
      page.value = editPage
      getDocument(page.value.documentId).then((editDocument) => {
        document.value = editDocument
      })
    })
  }

  const updateNode = async () => {
    await updateDocumentNode(
      document.value.documentId,
      document.value.node.nodes
    )
  }

  return {
    document,
    treeNodes,
    pageTitle,
    updateNode,
    fetchTreeData
  }
}
