import { useAxios } from '~/hooks/useAxios'
import { PageData } from '~/models/page/PageData'
import { createPageData } from '~/models/page/PageDataFactory'
import { NewPage } from '~/models/page/NewPage'

export const usePage = () => {
  const { axios } = useAxios()

  const getPage = async (pageId: string): Promise<PageData> => {
    console.log(`ページ取得： pageId=${pageId}`)
    const page = await axios.$get(`/api/pages/${pageId}`)
    return createPageData(page)
  }

  const registerPage = async (
    documentId: string,
    pageTitle: string,
    pageData: string
  ): Promise<PageData> => {
    const newPage = new NewPage(documentId, pageTitle, pageData)
    return await axios.$post('/api/pages', newPage)
  }

  const updatePage = async (page: PageData): Promise<void> => {
    console.log(`ページ更新： pageId=${page.pageId}`)
    await axios.$put('/api/pages', page)
  }

  return {
    getPage,
    registerPage,
    updatePage
  }
}
