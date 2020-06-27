export class PageData {
  documentId: string
  pageId: string
  pageTitle: string
  pageData: string

  constructor(
    documentId: string,
    pageId: string,
    pageTitle: string,
    pageData: string
  ) {
    this.documentId = documentId
    this.pageId = pageId
    this.pageTitle = pageTitle
    this.pageData = pageData
  }
}
