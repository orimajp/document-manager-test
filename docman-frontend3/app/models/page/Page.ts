export class Page {
  documentId: string
  pageId: string
  pageTitle: string
  pageData: string
  createdAt: string
  updatedAt: string

  constructor(
    documentId: string,
    pageId: string,
    pageTitle: string,
    pageData: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.documentId = documentId
    this.pageId = pageId
    this.pageTitle = pageTitle
    this.pageData = pageData
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
