import { computed } from '@vue/composition-api'
/// import * as dayjs from 'dayjs'
import dayjs from 'dayjs'
import { PageData } from '~/models/page/PageData'
import 'dayjs/locale/ja'

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

  const createdAt = computed(() =>
    props.pageContent === null ? '' : props.pageContent.createdAt
  )

  const updatedAt = computed(() =>
    props.pageContent === null ? '' : props.pageContent.updatedAt
  )

  const formatDate = (date: string) =>
    dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')

  return {
    pageTitle,
    pageData,
    createdAt,
    updatedAt,
    formatDate
  }
}
