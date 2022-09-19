import { reactive, toRefs } from '@nuxtjs/composition-api'
import { PageContentProp } from '~/composables/view/use-view-content'

export interface HeadlineMenuParam {
  showHeadlineMenu: boolean
  openPageId: string
  openPageTitle: string
  headlineHash: string
  headlineText: string
  headlineMenuX: number
  headlineMenuY: number
}

export interface HeadlineMenuProps {
  headlineMenuParam: HeadlineMenuParam
}

export const headlineMenuControll = (props: PageContentProp) => {
  const state = reactive({
    headlineMenuParam: {
      showHeadlineMenu: false,
      openPageId: '',
      openPageTitle: '',
      headlineHash: '',
      headlineText: '',
      headlineMenuX: 0,
      headlineMenuY: 0
    } as HeadlineMenuParam
  })

  const openContextMenu = (e: MouseEvent) => {
    const el = e.target as Element
    const textContext = el.textContent
    state.headlineMenuParam.showHeadlineMenu = true
    state.headlineMenuParam.openPageId = props.pageContent.pageId
    state.headlineMenuParam.openPageTitle = props.pageContent.pageTitle
    state.headlineMenuParam.headlineHash = el.id
    state.headlineMenuParam.headlineText = textContext || ''
    state.headlineMenuParam.headlineMenuX = e.clientX
    state.headlineMenuParam.headlineMenuY = e.clientY
  }

  const closeHeadlineMenu = () => {
    state.headlineMenuParam.showHeadlineMenu = false
  }

  const addClickListener = (target: HTMLElement) => {
    target.addEventListener('click', openContextMenu)
  }

  const removeClickListener = (target: HTMLElement) => {
    target.removeEventListener('click', openContextMenu)
  }

  return {
    ...toRefs(state),
    addClickListener,
    removeClickListener,
    closeHeadlineMenu
  }
}
