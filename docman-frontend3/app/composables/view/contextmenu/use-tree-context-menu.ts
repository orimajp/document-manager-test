import { computed } from '@nuxtjs/composition-api'
import { TreeContextMenuProps } from '~/composables/view/contextmenu/use-tree-context-menu-controll'

export const useTreeContextMenu = (
  props: TreeContextMenuProps,
  closeContextMenu: () => void
) => {
  const showContextMenu = computed<boolean>({
    get: () => props.treeContextMenuParam.showContextMenu,
    set: () => closeContextMenu()
  })

  const openPageId = computed(() => props.treeContextMenuParam.openPageId)

  const openPageTitle = computed(() => props.treeContextMenuParam.openPageTitle)

  const contextMenuX = computed(() => props.treeContextMenuParam.contextMenuX)

  const contextMenuY = computed(() => props.treeContextMenuParam.contextMenuY)

  const top = computed(() => props.treeContextMenuParam.top)

  return {
    showContextMenu,
    openPageId,
    openPageTitle,
    contextMenuX,
    contextMenuY,
    top
  }
}
