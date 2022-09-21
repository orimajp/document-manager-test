import { computed, useRoute } from '@nuxtjs/composition-api'
import dayjs from 'dayjs'
import { PageData } from '~/models/page/PageData'
import 'dayjs/locale/ja'

export interface PageContentProp {
  pageContent: PageData
}

const formatedDate = (date: string) =>
  dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')

const dummyDate = () => '-年-月-日 -:-:-'

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

  const pageId = computed(() =>
    props.pageContent === null ? '' : props.pageContent.pageId
  )

  const createdDateTime = computed(() =>
    createdAt.value === '' ? dummyDate() : formatedDate(createdAt.value)
  )

  const updatedDateTime = computed(() =>
    updatedAt.value === '' ? dummyDate() : formatedDate(updatedAt.value)
  )

  const route = useRoute()
  const goHash = () => {
    const hash = route.value.hash
    if (hash) {
      window.location.hash = ''
      // FIXME ハッシュクリア直後に再更新するとブラウザのURLからハッシュが消えてしまうので、無理矢理タイマで待ってから再更新する
      window.setTimeout(() => {
        window.location.hash = hash
      }, 200)
    }
  }

  return {
    pageId,
    pageTitle,
    pageData,
    createdDateTime,
    updatedDateTime,
    goHash
  }
}
