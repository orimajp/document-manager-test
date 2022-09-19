import { LinkedPageItem } from '~/models/page/LinkedPageItem'

export class LinkedPageMap {
  pageListMap: Map<string, LinkedPageItem>
  firstPage: LinkedPageItem | null // FIXME 現状無くても動く
  currentPage: LinkedPageItem | null

  constructor() {
    this.pageListMap = new Map<string, LinkedPageItem>()
    this.firstPage = null
    this.currentPage = null
  }

  appendPage(pageId: string, pageTitle: string) {
    const pageList = new LinkedPageItem(pageId, pageTitle)
    this.putPageMap(pageId, pageList)
    if (!this.firstPage) {
      this.firstPage = pageList
      this.currentPage = pageList
      return
    }
    this.currentPage!.next = pageList
    pageList.prev = this.currentPage
    this.currentPage = pageList
  }

  getLinkedPageItem(pageId: string) {
    const pageLink = this.pageListMap.get(pageId)
    if (!pageLink) {
      return null
    }
    return pageLink
  }

  private putPageMap(pageId: string, pageList: LinkedPageItem) {
    const orgPageLink = this.pageListMap.get(pageId)
    if (orgPageLink) {
      throw new Error(`ページIDが重複しています。 pageId=${pageId}`)
    }
    this.pageListMap.set(pageId, pageList)
  }
}
