import { useContext } from '@nuxtjs/composition-api'
import { IIndex } from '~/models/index/IIndex'

export const useIndexApi = () => {
  const { $axios } = useContext()

  const getIndexList = async (documentId: string): Promise<Array<IIndex>> => {
    return await $axios.get(`/api/indexes/${documentId}`).then((res) => res.data)
  }

  return {
    getIndexList
  }
}
