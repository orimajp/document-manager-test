import { useRouter } from '@nuxtjs/composition-api'

export const useTreeEditRouter = (updateNode: () => void) => {
  const router = useRouter()

  const gotoView = async (pageId: string) => {
    await router.push(`/document/view/${pageId}`)
  }

  const registerTree = async (pageId: string) => {
    await updateNode()
    await gotoView(pageId)
  }

  const cancelTree = async (pageId: string) => {
    await gotoView(pageId)
  }

  return {
    registerTree,
    cancelTree
  }
}
