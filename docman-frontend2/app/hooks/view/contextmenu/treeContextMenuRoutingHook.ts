import { Ref } from '@vue/composition-api'
import { usePage } from '~/hooks/usePage'
import useRouter from '~/hooks/useRouter'

export const useTreeContextRouting = (openPageId: Ref<string | null>) => {
  const { getPage } = usePage()
  const { router } = useRouter()

  const createChildPage = async () => {
    const page = await getPage(openPageId.value as string)
    const documentId = page.documentId
    await router.push(
      `/document/create/page/${documentId}?prevendChildTargetKey=${openPageId}`
    )
  }

  const createNextPage = async () => {
    const page = await getPage(openPageId.value as string)
    const documentId = page.documentId
    await router.push(
      `/document/create/page/${documentId}?appendNextTargetKey=${openPageId}`
    )
  }

  return {
    createChildPage,
    createNextPage
  }
}
