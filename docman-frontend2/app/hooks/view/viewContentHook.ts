import { computed } from '@vue/composition-api'
import { PageData } from '~/models/page/PageData'

export interface PageContentProp {
  pageContent: PageData
}

export const useViewContent = (props: PageContentProp) => {
  const pageTitle = computed(() =>
    props.pageContent === null ? '' : props.pageContent.pageTitle
  )
  const pageData = computed(() =>
    props.pageContent === null ? '' : props.pageContent.pageData
  )

  return {
    pageTitle,
    pageData
  }
}
