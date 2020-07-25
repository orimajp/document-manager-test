import { computed, SetupContext } from '@vue/composition-api'
import { NodeData } from '~/models/node/NodeData'
import { useRouter } from '~/hooks/useRouter'

export interface TreeProps {
  currentNode: NodeData
  pageIdArray: Array<string>
}

export const useTree = (treeProps: TreeProps, context: SetupContext) => {
  const iconText = computed(() => {
    if (
      !treeProps.currentNode.nodes ||
      treeProps.currentNode.nodes.length === 0
    ) {
      return ''
    }
    if (treeProps.currentNode.nodes && !treeProps.currentNode.expand) {
      return 'mdi-chevron-right'
    }
    return 'mdi-chevron-down'
  })

  const firstNode = computed(() => treeProps.pageIdArray.length === 0)

  // const currentPageId = computed(() => treeProps.currentNode.pageId)
  const currentPageId = computed(() => {
    console.log(`currentPageId=${treeProps.currentNode.pageId}`)
    return treeProps.currentNode.pageId
  })

  const addPageIdArray = computed(() =>
    treeProps.pageIdArray.concat(currentPageId.value)
  )

  const { router } = useRouter()

  const openPage = () => {
    return router.push(`/document/view/${currentPageId.value}`)
  }

  const openContextMenu = (pageId: string, e: MouseEvent) => {
    console.log(e)
    context.emit('openContextMenu', pageId, e)
  }

  const openTreeContextMenu = (e: MouseEvent) => {
    openContextMenu(currentPageId.value, e)
  }

  return {
    iconText,
    firstNode,
    currentPageId,
    addPageIdArray,
    openPage,
    openContextMenu,
    openTreeContextMenu
  }
}
