import { computed, ref, Ref, watch } from '@vue/composition-api'
import BreadCrumbListContainer from '~/containers/BreadCrumbListContainer'
import LinkedPageMapContainer from '~/containers/LinkedPageMapContainer'
import { PageLinkInfo } from '~/models/page/PageLinkInfo'

// FIXME ちょっと処理が複雑すぎる
export const useViewBreadCrumbList = () => {
  const { pageIds } = BreadCrumbListContainer.useContainer()

  const bottomPageId = computed(() => {
    if (pageIds.value.length === 0) {
      return null
    }
    return pageIds.value[pageIds.value.length - 1]
  })

  const linkedPageIds = computed(() => {
    if (pageIds.value.length === 0 || pageIds.value.length === 1) {
      return []
    }
    return pageIds.value.slice(0, pageIds.value.length - 1)
  })

  const { getLinkedPageItem } = LinkedPageMapContainer.useContainer()

  const bottomLinkedPageItem = computed(() => {
    if (bottomPageId.value === null) {
      return null
    }
    return getLinkedPageItem(bottomPageId.value as string)
  })

  const bottomPageItem = ref<Ref<PageLinkInfo> | null>(null)
  const linkedPageItems = ref<Array<PageLinkInfo>>([])

  watch(
    () => bottomLinkedPageItem.value,
    () => {
      if (bottomLinkedPageItem.value) {
        bottomPageItem.value = bottomLinkedPageItem.value.pageLinkInfo
        for (const pageId of linkedPageIds.value) {
          linkedPageItems.value.push(getLinkedPageItem(pageId)!.pageLinkInfo)
        }
      }
    }
  )

  const bottomPageTitle = computed(() => {
    return bottomPageItem.value === null ? '' : bottomPageItem.value.pageTitle
  })

  const createLink = (pageId: string) => {
    return `/document/view/${pageId}`
  }

  return {
    bottomPageTitle,
    linkedPageItems,
    createLink
  }
}
