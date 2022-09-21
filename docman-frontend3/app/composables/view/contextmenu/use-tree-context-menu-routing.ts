import { Ref, useRouter } from '@nuxtjs/composition-api'
import { usePage } from '~/composables/use-page'
import SnackbarComboContainer from '~/containers/snackbar-container'

const copyClipbord = (text: string) => {
  return window.navigator.clipboard.writeText(text)
}

const createPath = (pageId: string) => {
  return `/document/view/${pageId}`
}

const createMarkdownPath = (pageId: string, pageTitle: string) => {
  const path = createPath(pageId)
  return `[${pageTitle}](${path})`
}

const createUrl = (pageId: string) => {
  const protocal = location.protocol
  const host = location.host
  const path = createPath(pageId)
  return `${protocal}//${host}${path}`
}

const createChilePagePath = (documentId: string, pageId: string) => {
  return `/document/create/page/${documentId}?prevendChildTargetId=${pageId}`
}

const createNextPagePath = (documentId: string, pageId: string) => {
  return `/document/create/page/${documentId}?appendNextTargetId=${pageId}`
}

const URL_COPY_MESSAGE = 'URLをコピーしました'
const PATH_COPY_MESSAGE = 'パスをコピーしました'

export const useTreeContextRouting = (
  openPageId: Ref<string>,
  openPageTitle: Ref<string>
) => {
  const { infoMessage } = SnackbarComboContainer.useContainer()

  const openPage = () => {
    const url = createUrl(openPageId.value)
    window.open(url, '_blank', 'noopener')
  }

  const copyUrl = () => {
    const url = createUrl(openPageId.value)
    infoMessage.value = URL_COPY_MESSAGE
    return copyClipbord(url)
  }

  const copyPath = () => {
    const path = createMarkdownPath(openPageId.value, openPageTitle.value)
    infoMessage.value = PATH_COPY_MESSAGE
    return copyClipbord(path)
  }

  const { getPage } = usePage()
  const router = useRouter()

  const createChildPage = async () => {
    const page = await getPage(openPageId.value)
    const documentId = page.documentId
    const path = createChilePagePath(documentId, openPageId.value)
    return await router.push(path)
  }

  const createNextPage = async () => {
    const page = await getPage(openPageId.value)
    const documentId = page.documentId
    const path = createNextPagePath(documentId, openPageId.value)
    return await router.push(path)
  }

  return {
    openPage,
    copyUrl,
    copyPath,
    createChildPage,
    createNextPage
  }
}
