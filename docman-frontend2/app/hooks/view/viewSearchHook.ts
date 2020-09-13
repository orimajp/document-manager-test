import { computed, ref, watch } from '@vue/composition-api'
import { IndexSearchResult } from '~/models/index/IndexSearchResult'
import { useViewIndexSearch } from '~/hooks/view/viewIndexSearcHook'
import { useRouter } from '~/hooks/useRouter'

export interface ViewSearchProps {
  pageId: string
}

export const useViewSearch = (props: ViewSearchProps) => {
  const { available, searchWord, searchKeyword } = useViewIndexSearch()
  const searchResult = ref<Array<IndexSearchResult>>([])

  watch(
    () => searchKeyword.value,
    (newVal) => {
      searchResult.value = searchWord(newVal)
    }
  )

  const existsResult = computed(() => searchResult.value.length !== 0)
  const searchDisabled = computed(() => !available.value)
  const placeholder = computed(() =>
    searchDisabled.value ? '準備中…' : '検索'
  )

  const { router } = useRouter()
  const goPage = (path: string) => {
    router.push(path)
  }

  const isSelected = (id: string) => id === props.pageId

  const queries = computed(() =>
    searchKeyword.value ? [searchKeyword.value] : []
  )

  return {
    available,
    searchDisabled,
    placeholder,
    searchKeyword,
    searchResult,
    existsResult,
    goPage,
    isSelected,
    queries
  }
}
