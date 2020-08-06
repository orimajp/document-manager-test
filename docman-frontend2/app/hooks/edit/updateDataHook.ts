import { computed, ref, Ref } from '@vue/composition-api'
import { PageData } from '~/models/page/PageData'
import { usePage } from '~/hooks/usePage'

export const useUpdateData = (pageId: string, change: Ref<boolean>) => {
  const page = ref({
    documentId: '',
    pageId: '',
    pageTitle: '',
    pageData: '',
    createdAt: '',
    updatedAt: ''
  }) as Ref<PageData>

  const { getPage } = usePage()
  getPage(pageId).then((editPageData) => (page.value = editPageData))

  const pageTitle = computed(() => page.value.pageTitle)

  const pageData = computed(() => page.value.pageData)

  const documentEdit = computed(
    () => page.value.pageId === page.value.documentId
  )

  const updateTitle = (updateTitle: string) => {
    change.value = true
    page.value.pageTitle = updateTitle
  }

  const updatePageData = (updatePageData: string) => {
    change.value = true
    page.value.pageData = updatePageData
  }

  return {
    page,
    pageTitle,
    pageData,
    documentEdit,
    updateTitle,
    updatePageData
  }
}
