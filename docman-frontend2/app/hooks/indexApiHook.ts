import { useAxios } from '~/hooks/useAxios'
import { IIndex } from '~/models/index/IIndex'

export const useIndexApi = () => {
  const { axios } = useAxios()

  const getIndexList = async (documentId: string): Promise<Array<IIndex>> => {
    return await axios.get(`/api/indexes/${documentId}`).then((res) => res.data)
  }

  return {
    getIndexList
  }
}
