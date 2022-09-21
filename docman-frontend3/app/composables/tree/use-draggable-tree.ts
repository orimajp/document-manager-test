import { computed, ref } from '@nuxtjs/composition-api'
import { INode } from '~/models/node/INode'

export interface DraggableTreeProps {
  value?: Array<INode>
  list?: Array<INode>
  currentPageId: string
}

export const useDraggableTree = (
  props: DraggableTreeProps,
) => {
  const moving = ref(false)
  const selectedPageId = ref<string | null>(null)
  const readValue = computed(() => (props.value ? props.value : props.list))

  const startMove = (e: MouseEvent) => {
    console.log(e)
    moving.value = true
  }

  const endMove = () => {
    moving.value = false
    selectedPageId.value = null
  }

  const mouseDown = (e: MouseEvent) => {
    if (e) {
      // eslint-disable-next-line no-undef
      selectedPageId.value = ((e.target as unknown) as HTMLOrSVGElement).dataset
        .pageId as string
    }
  }

  const mouseUp = () => (selectedPageId.value = null)

  const isCurrentPage = (pageId: string) => {
    console.log(
      `isCurrentPage(): pageId=${pageId}, props.currentPageId=${props.currentPageId}`
    )
    return props.currentPageId === pageId
  }

  const selectionPage = (pageId: string) => {
    return selectedPageId.value === pageId
  }

  return {
    moving,
    selectedPageId,
    readValue,
    startMove,
    endMove,
    mouseDown,
    mouseUp,
    isCurrentPage,
    selectionPage
  }
}
