import { computed, SetupContext } from '@vue/composition-api'
import { HeadlineMenuProps } from '~/hooks/view/headlinmenu/headlineMenuControllHook'
import SnackbarComboContainer from '~/containers/SnackbarComboContainer'

const createPathWithHash = (pageId: string, hash: string) => {
  return `/document/view/${pageId}#${hash}`
}

const createUrlWithHash = (pageId: string, hash: string) => {
  const protocal = location.protocol
  const host = location.host
  const path = createPathWithHash(pageId, hash)
  return `${protocal}//${host}${path}`
}

const createMarkdownLink = (title: string, path: string) => {
  return `[${title}](${path})`
}

const createMarkdownHash = (title: string, hash: string) => {
  return `[${title}](#${hash})`
}

const createTitleWithHash = (title: string, headlineText: string) => {
  return `${title} :: ${headlineText}`
}

const copyClipbord = (text: string) => {
  return window.navigator.clipboard.writeText(text)
}

const URL_COPY_MESSAGE = 'URLをコピーしました'
const HASHED_PATH_COPY_MESSAGE = 'ハッシュ付きパスリンクをコピーしました'
const HASH_COPY_MESSAGE = 'ハッシュリンクをコピーしました'

export const useHeadlineMenu = (
  props: HeadlineMenuProps,
  context: SetupContext
) => {
  const showHeadlineMenu = computed<boolean>({
    get: () => props.headlineMenuParam.showHeadlineMenu,
    set: () => context.emit('closeHeadlineMenu')
  })

  const openPageId = computed(() => props.headlineMenuParam.openPageId)
  const openPageTitle = computed(() => props.headlineMenuParam.openPageTitle)
  const headlineHash = computed(() => props.headlineMenuParam.headlineHash)
  const headlineText = computed(() => props.headlineMenuParam.headlineText)
  const headlineMenuX = computed(() => props.headlineMenuParam.headlineMenuX)
  const headlineMenuY = computed(() => props.headlineMenuParam.headlineMenuY)

  const { infoMessage } = SnackbarComboContainer.useContainer()

  const copyUrl = () => {
    const title = createTitleWithHash(openPageTitle.value, headlineText.value)
    const url = createUrlWithHash(openPageId.value, headlineHash.value)
    const markdownLink = createMarkdownLink(title, url)
    infoMessage.value = URL_COPY_MESSAGE
    return copyClipbord(markdownLink)
  }

  const copyMarkdownPath = () => {
    const title = createTitleWithHash(openPageTitle.value, headlineText.value)
    const path = createPathWithHash(openPageId.value, headlineHash.value)
    const markdownLink = createMarkdownLink(title, path)
    infoMessage.value = HASHED_PATH_COPY_MESSAGE
    return copyClipbord(markdownLink)
  }

  const copyMarkdownHash = () => {
    const title = createTitleWithHash(openPageTitle.value, headlineText.value)
    const markdownLink = createMarkdownHash(title, headlineHash.value)
    infoMessage.value = HASH_COPY_MESSAGE
    return copyClipbord(markdownLink)
  }

  return {
    showHeadlineMenu,
    headlineMenuX,
    headlineMenuY,
    copyUrl,
    copyMarkdownPath,
    copyMarkdownHash
  }
}
