import { IPage } from '~/page/page.interface';

export class Page implements IPage {
  documentId: string;
  pageId: string;
  pageData: string;
  pageTitle: string;
  createdAt: string;
  updatedAt: string;
  version: number;

  constructor(
    documentId: string,
    pageId: string,
    pageData: string,
    pageTitle: string,
    createdAt: string,
    updatedAt: string,
    version = 0
  ) {
    this.documentId = documentId
    this.pageId = pageId
    this.pageData = pageData
    this.pageTitle = pageTitle
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.version = version
  }
}
