import { computed, SetupContext } from '@vue/composition-api'
import { TreeContextMenuProps } from '~/hooks/view/contextmenu/treeContextMenuControllHook'

export const useTreeContextMenu = (
  props: TreeContextMenuProps,
  context: SetupContext
) => {
  const showContextMenu = computed<boolean>({
    get: () => props.treeContextMenuParam.showContextMenu,
    set: () => context.emit('closeContextMenu')
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
