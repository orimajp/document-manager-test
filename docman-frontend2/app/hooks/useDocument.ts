import { useAxios } from '~/hooks/useAxios'
import { IDocumentList } from '~/models/document/IDocumentList'
import { DocumentData } from '~/models/document/DocumentData'
import { createDocumentData } from '~/models/document/factory/DocumentDataFactory'

export const useDocument = () => {
  const { axios } = useAxios()

  const search = (): Promise<Array<IDocumentList>> => {
    // return await axios.$get<Array<IDocumentList>>('/api/documents')
    return axios.$get<Array<IDocumentList>>('/api/documents')
  }

  const getDocument = async (documentId: string): Promise<DocumentData> => {
    const document = await axios.$get(`/api/documents/${documentId}`)
    return createDocumentData(document)
  }

  return {
    search,
    getDocument
  }
}
