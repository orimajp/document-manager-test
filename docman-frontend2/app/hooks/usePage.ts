import { useAxios } from '~/hooks/useAxios'
import { PageData } from '~/models/page/PageData'
import { createPageData } from '~/models/page/PageDataFactory'

export const usePage = () => {
  const { axios } = useAxios()

  const getPage = async (pageId: string): Promise<PageData> => {
    const page = await axios.$get(`/api/pages/${pageId}`)
    return createPageData(page)
  }

  return {
    getPage
  }
}
