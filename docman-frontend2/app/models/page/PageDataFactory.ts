import { IPage } from '~/models/page/IPage'
import { PageData } from '~/models/page/PageData'

export function createPageData(iPage: IPage): PageData {
  return new PageData(
    iPage.documentId,
    iPage.pageId,
    iPage.pageTitle,
    iPage.pageData,
    iPage.createdAt,
    iPage.updatedAt
  )
}
