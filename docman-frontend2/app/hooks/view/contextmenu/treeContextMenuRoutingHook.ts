import { Ref } from '@vue/composition-api'
import { usePage } from '~/hooks/usePage'
import { useRouter } from '~/hooks/useRouter'

export const useTreeContextRouting = (openPageId: Ref<string | null>) => {
  const { getPage } = usePage()
  const { router } = useRouter()

  const createChildPage = async () => {
    const page = await getPage(openPageId.value as string)
    const documentId = page.documentId
    await router.push(
      `/document/create/page/${documentId}?prevendChildTargetId=${openPageId.value}`
    )
  }

  const createNextPage = async () => {
    const page = await getPage(openPageId.value as string)
    const documentId = page.documentId
    await router.push(
      `/document/create/page/${documentId}?appendNextTargetId=${openPageId.value}`
    )
  }

  return {
    createChildPage,
    createNextPage
  }
}
