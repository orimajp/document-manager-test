import { useAxios } from '~/hooks/useAxios'
import { PageData } from '~/models/page/PageData'
import { createPageData } from '~/models/page/PageDataFactory'

export const usePage = () => {
  const { axios } = useAxios()

  const getPage = async (pageId: string): Promise<PageData> => {
    console.log(`ページ取得： pageId=${pageId}`)
    const page = await axios.$get(`/api/pages/${pageId}`)
    return createPageData(page)
  }

  const updatePage = async (page: PageData): Promise<void> => {
    console.log(`ページ更新： pageId=${page.pageId}`)
    await axios.$put('/api/pages', page)
  }

  return {
    getPage,
    updatePage
  }
}
