import { computed, ref, Ref, watchEffect, useRouter } from '@nuxtjs/composition-api'
import { PageLinkInfo } from '~/models/page/PageLinkInfo'
import LinkedPageMapContainer from '~/containers/linked-page-map-container'

export interface NavInfoProp {
  pageId: string
}

const makeLink = (pageId: string) => {
  return `/document/view/${pageId}`
}

export const useViewNavigation = (props: NavInfoProp) => {
  const { getLinkedPageItem } = LinkedPageMapContainer.useContainer()
  const linkedPageItem = computed(() => getLinkedPageItem(props.pageId))

  const prevLink = ref<Ref<PageLinkInfo> | null>(null)
  const nextLink = ref<Ref<PageLinkInfo> | null>(null)

  watchEffect(() => {
    if (linkedPageItem.value) {
      prevLink.value = linkedPageItem.value.prev
        ? linkedPageItem.value.prev.pageLinkInfo
        : null
      nextLink.value = linkedPageItem.value.next
        ? linkedPageItem.value.next.pageLinkInfo
        : null
    }
  })

  const existsPrevPage = computed(() => prevLink.value !== null)
  const existsNextPage = computed(() => nextLink.value !== null)

  const prevId = computed(() =>
    existsPrevPage.value ? prevLink.value!.pageId : ''
  )
  const nextId = computed(() =>
    existsNextPage.value ? nextLink.value!.pageId : ''
  )

  const prevTitle = computed(() =>
    existsPrevPage.value ? prevLink.value!.pageTitle : ''
  )
  const nextTitle = computed(() =>
    existsNextPage.value ? nextLink.value!.pageTitle : ''
  )

  const router = useRouter()
  const goPrev = () => {
    return router.push(makeLink(prevId.value))
  }
  const goNext = () => {
    return router.push(makeLink(nextId.value))
  }

  return {
    existsPrevPage,
    existsNextPage,
    prevId,
    nextId,
    prevTitle,
    nextTitle,
    goPrev,
    goNext
  }
}
