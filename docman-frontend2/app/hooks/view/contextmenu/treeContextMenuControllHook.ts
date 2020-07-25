import { reactive, toRefs } from '@vue/composition-api'

export interface TreeContextMenuParam {
  showContextMenu: boolean
  openPageId: string | null
  contextMenuX: number
  contextMenuY: number
  top: boolean
}

export const useTreeContextControll = () => {
  const state = reactive({
    contextMenuParam: {
      showContextMenu: false,
      openPageId: null,
      contextMenuX: 0,
      contextMenuY: 0,
      top: false
    } as TreeContextMenuParam
  })

  const openContextMenu = (pageId: string, e: MouseEvent, top: boolean) => {
    e.preventDefault()
    state.contextMenuParam.showContextMenu = true
    state.contextMenuParam.openPageId = pageId
    state.contextMenuParam.contextMenuX = e.clientX
    state.contextMenuParam.contextMenuY = e.clientY
    state.contextMenuParam.top = top
  }

  const openTopContextMenu = (pageId: string, e: MouseEvent) => {
    openContextMenu(pageId, e, true)
  }

  const openTreeContextMenu = (pageId: string, e: MouseEvent) => {
    openContextMenu(pageId, e, false)
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
