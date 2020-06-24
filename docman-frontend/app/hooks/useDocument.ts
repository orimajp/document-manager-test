import { useAxios } from '~/hooks/useAxios'
import { IDocumentList } from '~/models/document/IDocumentList'

export const userDocument = () => {
  const { axios } = useAxios()

  const search = async () => {
    return await axios.$get<Array<IDocumentList>>('/api/documents')
  }

  return {
    search
  }
}
