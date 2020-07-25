import { onMounted, Ref, watch } from '@vue/composition-api'
import HeadlineContanier from '~/containers/HeadlineContanier'
import { createDocumentHeadline } from '~/models/document/factory/DocumentHeadlineFactory'
import { PageContentProp } from '~/hooks/view/viewContentHook'

const HeadlineSelector =
  '.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6'

export const useCollectHeadline = (
  props: PageContentProp,
  viewer: Ref<HTMLElement | null>
) => {
  const {
    headlines,
    clearHeadlines,
    addHeadline
  } = HeadlineContanier.useContainer()

  onMounted(() => {
    collectHeadLine()
  })

  watch(
    () => props.pageContent,
    () => {
      collectHeadLine()
    }
  )

  const collectHeadLine = () => {
    clearHeadlines()

    if (!viewer.value) {
      return
    }

    const headers = viewer.value.querySelectorAll<HTMLElement>(HeadlineSelector)
    // @ts-ignore
    for (const header of headers) {
      addHeadline(createDocumentHeadline(header))
    }

    console.log(JSON.stringify(headlines.value, null, 2))
  }
}
