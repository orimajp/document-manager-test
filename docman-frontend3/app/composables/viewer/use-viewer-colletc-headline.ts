import {
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  Ref,
  watch
} from '@nuxtjs/composition-api'
import { PageContentProp } from '~/composables/view/use-view-content'

const HeadlineSelector =
  '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'

export const useViewerCollectHeadline = (
  props: PageContentProp,
  viewer: Ref<HTMLElement | null>,
  addClickListener: (target: HTMLElement) => void,
  removeClickListener: (target: HTMLElement) => void
) => {
  const headerArray = ref<Array<HTMLElement>>([])
  let waiting = false

  onMounted(() => {
    window.setTimeout(function () {
      handleEventHeadLine()
    }, 500)
  })

  onUnmounted(() => {
    for (const header of headerArray.value) {
      removeEventListener(header)
    }
    headerArray.value = []
  })

  watch(
    () => props.pageContent.pageData,
    () => {
      handleEventHeadLine()
    }
  )

  const addEventListtener = (target: HTMLElement) => {
    addClickListener(target)
  }

  const removeEventListener = (target: HTMLElement) => {
    removeClickListener(target)
  }

  const handleEventHeadLine = async () => {
    if (!viewer.value || waiting) {
      return
    }

    waiting = true

    for (const header of headerArray.value) {
      removeEventListener(header)
    }
    headerArray.value = []

    await nextTick()

    const headers = viewer.value.querySelectorAll<HTMLElement>(HeadlineSelector)
    Array.from(headers).forEach((header) => {
      headerArray.value.push(header)
      addEventListtener(header)
    })

    window.setTimeout(function () {
      waiting = false
    }, 200)
  }
}
