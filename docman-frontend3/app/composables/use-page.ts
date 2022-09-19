import { useContext } from '@nuxtjs/composition-api'
import { PageData } from '~/models/page/PageData'
import { createPageData } from '~/models/page/PageDataFactory'
import { NewPage } from '~/models/page/NewPage'
import { NewPositonPage } from '~/models/page/NewPositonPage'

export const usePage = () => {
  const { $axios } = useContext()

  const getPage = async (pageId: string): Promise<PageData> => {
    console.log(`ページ取得： pageId=${pageId}`)
    const page = await $axios.$get(`/api/pages/${pageId}`)
    return createPageData(page)
  }

  const registerPage = async (
    documentId: string,
    pageTitle: string,
    pageData: string
  ): Promise<PageData> => {
    const newPage = new NewPage(documentId, pageTitle, pageData)
    return await $axios.$post('/api/pages', newPage)
  }

  const registerPagePrevendChild = async (
    documentId: string,
    pageTitle: string,
    pageData: string,
    targePagetId: string
  ): Promise<PageData> => {
    const newPositonPage = new NewPositonPage(
      documentId,
      pageTitle,
      pageData,
      targePagetId
    )
    return await $axios.$post('/api/pages/prevend', newPositonPage)
  }

  const registerPageAppendNext = async (
    documentId: string,
    pageTitle: string,
    pageData: string,
    targePagetId: string
  ): Promise<PageData> => {
    const newPositonPage = new NewPositonPage(
      documentId,
      pageTitle,
      pageData,
      targePagetId
    )
    return await $axios.$post('/api/pages/append', newPositonPage)
  }

  const updatePage = async (page: PageData): Promise<void> => {
    console.log(`ページ更新： pageId=${page.pageId}`)
    await $axios.$put('/api/pages', page)
  }

  return {
    getPage,
    registerPage,
    registerPagePrevendChild,
    registerPageAppendNext,
    updatePage
  }
}
