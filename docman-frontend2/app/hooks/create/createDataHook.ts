import { computed, ref, Ref } from '@vue/composition-api'
import { PageData } from '~/models/page/PageData'

export const useCreateDataHook = (change: Ref<boolean>) => {
  const page = ref({
    documentId: '',
    pageId: '',
    pageTitle: '',
    pageData: '',
    createdAt: '',
    updatedAt: ''
  }) as Ref<PageData>
  const title = computed(() => page.value.pageTitle)
  const data = computed(() => page.value.pageData)

  const updateTitle = (updateTitle: string) => {
    change.value = true
    page.value.pageTitle = updateTitle
  }
  const updatePageData = (updatePageData: string) => {
    change.value = true
    page.value.pageData = updatePageData
  }

  return {
    title,
    data,
    page,
    updateTitle,
    updatePageData
  }
}
