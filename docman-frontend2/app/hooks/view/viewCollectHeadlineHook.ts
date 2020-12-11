import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  Ref,
  watch
} from '@vue/composition-api'
import HeadlineContanier from '~/containers/HeadlineContanier'
import { createDocumentHeadline } from '~/models/document/factory/DocumentHeadlineFactory'
import { PageContentProp } from '~/hooks/view/viewContentHook'

const HeadlineSelector =
  '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'

export const useCollectHeadline = (
  props: PageContentProp,
  viewer: Ref<HTMLElement | null>,
  addClickListener: (target: HTMLElement) => void,
  removeClickListener: (target: HTMLElement) => void
) => {
  const { clearHeadlines, addHeadline } = HeadlineContanier.useContainer()

  const headerArray = ref<Array<HTMLElement>>([])

  onMounted(() => {
    nextTick(() => {
      collectHeadLine()
    })
  })

  onUnmounted(() => {
    for (const header of headerArray.value) {
      removeEventListener(header)
    }
    headerArray.value = []
  })

  watch(
    () => props.pageContent,
    () => {
      nextTick(() => {
        collectHeadLine()
      })
    }
  )

  const addEventListtener = (target: HTMLElement) => {
    addClickListener(target)
  }

  const removeEventListener = (target: HTMLElement) => {
    removeClickListener(target)
  }

  const collectHeadLine = () => {
    clearHeadlines()

    if (!viewer.value) {
      return
    }

    for (const header of headerArray.value) {
      removeEventListener(header)
    }
    headerArray.value = []

    const headers = viewer.value.querySelectorAll<HTMLElement>(HeadlineSelector)
    Array.from(headers).forEach((header) => {
      headerArray.value.push(header)
      addEventListtener(header)
      addHeadline(createDocumentHeadline(header))
    })
  }
}
