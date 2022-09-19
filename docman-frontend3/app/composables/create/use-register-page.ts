import { useRouter } from '@nuxtjs/composition-api'
import { usePage } from '~/composables/use-page'
import { useDocument } from '~/composables/use-document'

export const useRegisterPage = (openDialog: (pageId: string) => void) => {
  const router = useRouter()
  const {
    getPage,
    registerPage,
    registerPagePrevendChild,
    registerPageAppendNext
  } = usePage()
  const { getDocument } = useDocument()

  const goNewPage = (pageId: string) => {
    router.push(`/document/view/${pageId}`)
  }

  const registerNewPageSelectPositon = (
    documentId: string,
    pageTitle: string,
    pageData: string
  ) => {
    getDocument(documentId).then((document) => {
      const firstPage = document.node.nodes.length === 0
      registerPage(documentId, pageTitle, pageData).then((newPage) => {
        if (firstPage) {
          goNewPage(newPage.pageId)
          return
        }
        openDialog(newPage.pageId)
      })
    })
  }

  const registerNewPagePrevendChild = (
    documentId: string,
    pageTitle: string,
    pageData: string,
    tqrgetId: string
  ) => {
    registerPagePrevendChild(documentId, pageTitle, pageData, tqrgetId).then(
      (newPage) => {
        goNewPage(newPage.pageId)
      }
    )
  }

  const registerNewPageAppendNext = (
    documentId: string,
    pageTitle: string,
    pageData: string,
    tqrgetId: string
  ) => {
    registerPageAppendNext(documentId, pageTitle, pageData, tqrgetId).then(
      (newPage) => {
        goNewPage(newPage.pageId)
      }
    )
  }

  const registerNewPage = (
    pageId: string,
    pageTitle: string,
    pageData: string,
    prevendChildTargetId: string | null,
    appendNextTargetId: string | null
  ) => {
    getPage(pageId).then((document) => {
      const documentId = document.documentId
      if (prevendChildTargetId) {
        registerNewPagePrevendChild(
          documentId,
          pageTitle,
          pageData,
          prevendChildTargetId
        )
        return
      }
      if (appendNextTargetId) {
        registerNewPageAppendNext(
          documentId,
          pageTitle,
          pageData,
          appendNextTargetId
        )
        return
      }
      registerNewPageSelectPositon(documentId, pageTitle, pageData)
    })
  }

  return {
    registerNewPage
  }
}
