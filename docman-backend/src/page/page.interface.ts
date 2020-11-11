export interface IPage {
  pageId: string
  documentId: string
  pageTitle: string
  pageData: string
  createdAt: string // FIXME Date型は型定義されていない
  updatedAt: string // FIXME Date型は型定義されていない
  version: number
}
