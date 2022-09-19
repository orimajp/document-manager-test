// import { computed, SetupContext, useRouter } from '@nuxtjs/composition-api'
import { computed, useRouter } from '@nuxtjs/composition-api'
import { NodeData } from '~/models/node/NodeData'

/*
interface Emits {
  (e: 'openContextMenu', pageId: string, pageTitle: string, ex: MouseEvent): void
}
const emit = defineEmits<Emits>()
*/

export interface TreeProps {
  currentNode: NodeData
  pageIdArray: Array<string>
}

// export const useTree = (treeProps: TreeProps, context: SetupContext) => {
export const useTree = (
  treeProps: TreeProps,
  openContextMenu: (pageId: string, pageTitle: string, e: MouseEvent) => void
 ) => {
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

  const currentPageId = computed(() => treeProps.currentNode.pageId)

  const currentPageTitle = computed(() => treeProps.currentNode.pageTitle)

  const addPageIdArray = computed(() =>
    treeProps.pageIdArray.concat(currentPageId.value)
  )

  const router = useRouter()
  const openPage = () => {
    return router.push(`/document/view/${currentPageId.value}`)
  }

  /*
  const openContextMenu = (
    pageId: string,
    pageTitle: string,
    e: MouseEvent
  ) => {
//     context.emit('openContextMenu', pageId, pageTitle, e)
    emit('openContextMenu', pageId, pageTitle, e)
  }
  */

  const openTreeContextMenu = (e: MouseEvent) => {
    openContextMenu(currentPageId.value, currentPageTitle.value, e)
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
