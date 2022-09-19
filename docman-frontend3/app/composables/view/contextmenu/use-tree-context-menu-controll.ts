import { reactive, toRefs } from '@nuxtjs/composition-api'

export interface TreeContextMenuParam {
  showContextMenu: boolean
  openPageId: string
  openPageTitle: string
  contextMenuX: number
  contextMenuY: number
  top: boolean
}

export interface TreeContextMenuProps {
  treeContextMenuParam: TreeContextMenuParam
}

export const useTreeContextControll = () => {
  const state = reactive({
    contextMenuParam: {
      showContextMenu: false,
      openPageId: '',
      openPageTitle: '',
      contextMenuX: 0,
      contextMenuY: 0,
      top: false
    } as TreeContextMenuParam
  })

  const openContextMenu = (
    pageId: string,
    pageTitle: string,
    e: MouseEvent,
    top: boolean
  ) => {
    e.preventDefault()
    state.contextMenuParam.showContextMenu = true
    state.contextMenuParam.openPageId = pageId
    state.contextMenuParam.openPageTitle = pageTitle
    state.contextMenuParam.contextMenuX = e.clientX
    state.contextMenuParam.contextMenuY = e.clientY
    state.contextMenuParam.top = top
  }

  const openTopContextMenu = (
    pageId: string,
    pageTitle: string,
    e: MouseEvent
  ) => {
    openContextMenu(pageId, pageTitle, e, true)
  }

  const openTreeContextMenu = (
    pageId: string,
    pageTitle: string,
    e: MouseEvent
  ) => {
    openContextMenu(pageId, pageTitle, e, false)
  }

  const closeContextMenu = () => {
    state.contextMenuParam.showContextMenu = false
  }

  return {
    ...toRefs(state),
    openTopContextMenu,
    openTreeContextMenu,
    closeContextMenu
  }
}
