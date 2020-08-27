import { PageLinkInfo } from '~/models/page/PageLinkInfo'

export class LinkedPageItem {
  pageLinkInfo: PageLinkInfo
  next: LinkedPageItem | null
  prev: LinkedPageItem | null

  constructor(pageId: string, pageTitle: string) {
    this.pageLinkInfo = new PageLinkInfo(pageId, pageTitle)
    this.next = null
    this.prev = null
  }
}
