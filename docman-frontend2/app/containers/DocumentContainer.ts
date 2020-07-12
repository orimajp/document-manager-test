import { reactive, toRefs } from '@vue/composition-api'
import { createContainer } from 'vue-unstated'
import { NodeData } from '~/models/node/NodeData'
import { DocumentData } from '~/models/document/DocumentData'
import { useDocument } from '~/hooks/useDocument'

const useDisplayDocument = () => {
  const state = reactive({
    document: {
      documentId: '',
      documentTitle: '',
      createdAt: '',
      updatedAt: '',
      node: {} as NodeData
    } as DocumentData
  })

  const { getDocument } = useDocument()

  const fetchDocument = async (documentId: string): Promise<void> => {
    const documentData = await getDocument(documentId)
    setDocument(documentData)
  }

  const setDocument = (documentData: DocumentData): void => {
    state.document = documentData
  }

  const openChildren = (list: Array<string>): void => {
    state.document.openChildren(list)
  }

  const getNestedIdArray = (pageId: string): Array<string> => {
    return state.document.getNestedIdArray(pageId)
  }

  return {
    ...toRefs(state),
    setDocument,
    openChildren,
    fetchDocument,
    getNestedIdArray
  }
}

export default createContainer(useDisplayDocument)
