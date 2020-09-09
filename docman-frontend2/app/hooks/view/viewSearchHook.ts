import { computed, ref, watch } from '@vue/composition-api'
import { IndexSearchResult } from '~/models/index/IndexSearchResult'
import { useViewIndexSearch } from '~/hooks/view/viewIndexSearcHook'
import { useRouter } from '~/hooks/useRouter'

export const useViewSearch = () => {
  const { available, searchWord } = useViewIndexSearch()
  const searchKeyword = ref('')
  const searchResult = ref<Array<IndexSearchResult>>([])

  watch(
    () => searchKeyword.value,
    (newVal) => {
      searchResult.value = searchWord(newVal)
    }
  )

  const existsResult = computed(() => searchResult.value.length !== 0)
  const searchDisabled = computed(() => !available.value)

  const { router } = useRouter()
  const goPage = (path: string) => {
    router.push(path)
  }

  return {
    available,
    searchDisabled,
    searchKeyword,
    searchResult,
    existsResult,
    goPage
  }
}
