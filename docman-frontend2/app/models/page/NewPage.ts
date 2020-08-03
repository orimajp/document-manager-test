export class NewPage {
  documentId: string
  pageTitle: string
  pageData: string

  constructor(documentId: string, pageTitle: string, pageData: string) {
    this.documentId = documentId
    this.pageTitle = pageTitle
    this.pageData = pageData
  }
}
