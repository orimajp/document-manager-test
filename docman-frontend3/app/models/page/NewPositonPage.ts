export class NewPositonPage {
  documentId: string
  pageTitle: string
  pageData: string
  targetPageId: string

  constructor(
    documentId: string,
    pageTitle: string,
    pageData: string,
    targePagetId: string
  ) {
    this.documentId = documentId
    this.pageTitle = pageTitle
    this.pageData = pageData
    this.targetPageId = targePagetId
  }
}
