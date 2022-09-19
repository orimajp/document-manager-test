// import { computed, SetupContext } from '@nuxtjs/composition-api'
import { computed } from '@nuxtjs/composition-api'
// import { defineEmits } from 'vue'
import { TreeContextMenuProps } from '~/composables/view/contextmenu/use-tree-context-menu-controll'

/*
interface Emits {
  (e: 'closeContextMenu'): void
}
*/


export interface TreeContextMenuEmits {
  (e: 'closeContextMenu'): void
}

// const emit = defineEmits<Emits>()

export const useTreeContextMenu = (
  props: TreeContextMenuProps,
//  emit: TreeContextMenuEmits,
//  context: SetupContext
closeContextMenu: () => void
) => {
  const showContextMenu = computed<boolean>({
    get: () => props.treeContextMenuParam.showContextMenu,
//    set: () => context.emit('closeContextMenu')
//    set: () => emit('closeContextMenu')
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
