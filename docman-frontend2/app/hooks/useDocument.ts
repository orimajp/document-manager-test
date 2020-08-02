import { useAxios } from '~/hooks/useAxios'
import { IDocumentList } from '~/models/document/IDocumentList'
import { DocumentData } from '~/models/document/DocumentData'
import { createDocumentData } from '~/models/document/factory/DocumentDataFactory'
import { NewDocument } from '~/models/document/NewDocument'
import { Node } from '~/models/node/Node'
import { UpdateDocumentNodes } from '~/models/node/UpdateDocumentNodes'

export const useDocument = () => {
  const { axios } = useAxios()

  const search = (): Promise<Array<IDocumentList>> => {
    // return await axios.$get<Array<IDocumentList>>('/api/documents')
    return axios.$get<Array<IDocumentList>>('/api/documents')
  }

  const getDocument = async (documentId: string): Promise<DocumentData> => {
    console.log(`ドキュメント取得： documentId=${documentId}`)
    const document = await axios.$get(`/api/documents/${documentId}`)
    return createDocumentData(document)
  }

  const registerDocument = async (
    documentTitle: string,
    documentData: string
  ): Promise<DocumentData> => {
    const newDocument = new NewDocument(documentTitle, documentData)
    const document = await axios.$post('api/documents', newDocument)
    return createDocumentData(document)
  }

  const updateDocumentNode = async (
    documentId: string,
    nodes: Array<Node>
  ): Promise<void> => {
    const updateDocumentNode = new UpdateDocumentNodes(nodes)
    await axios.$put(`/api/documents/${documentId}/nodes`, updateDocumentNode)
  }

  return {
    search,
    getDocument,
    registerDocument,
    updateDocumentNode
  }
}
