import { IPage } from '~/page/page.interface';

export class Page implements IPage {
  documentId: string;
  pageId: string;
  pageData: string;
  pageTitle: string;
  createdAt: string;
  updatedAt: string;

  constructor(
    documentId: string,
    pageId: string,
    pageData: string,
    pageTitle: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.documentId = documentId
    this.pageId = pageId
    this.pageData = pageData
    this.pageTitle = pageTitle
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
