import { computed } from '@vue/composition-api'
/// import * as dayjs from 'dayjs'
import dayjs from 'dayjs'
import { PageData } from '~/models/page/PageData'
import 'dayjs/locale/ja'
import { useRouter } from '~/hooks/useRouter'

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

  const { route } = useRouter()
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

  const formatDate = (date: string) =>
    dayjs(date).format('YYYY年MM月DD日 HH:mm:ss')

  return {
    pageTitle,
    pageData,
    createdAt,
    updatedAt,
    goHash,
    formatDate
  }
}
