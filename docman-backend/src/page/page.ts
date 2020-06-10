import { IPage } from '~/page/page.interface';

export class Page implements IPage {
  createdAt: string;
  documentId: string;
  pageData: string;
  pageId: string;
  pageTitle: string;
  updatedAt: string;
}
