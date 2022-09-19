import { PageLinkInfo } from '~/models/page/PageLinkInfo'

export class LinkedPageItem {
  pageLinkInfo: PageLinkInfo
  // eslint-disable-next-line
  next: LinkedPageItem | null
  // eslint-disable-next-line
  prev: LinkedPageItem | null

  constructor(pageId: string, pageTitle: string) {
    this.pageLinkInfo = new PageLinkInfo(pageId, pageTitle)
    this.next = null
    this.prev = null
  }
}
