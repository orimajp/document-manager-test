import { computed, onMounted, ref } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import { useTreeEditData } from '~/hooks/tree/treeEditDataHook'
import { useTreeEditRouter } from '~/hooks/tree/treeEditRouterHook'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

export const useTreeEditor = () => {
  const { treeNodes, pageTitle, updateNode, fetchTreeData } = useTreeEditData()
  const { registerTree, cancelTree } = useTreeEditRouter(updateNode)

  const windowHeight = ref(0)
  onMounted(() => (windowHeight.value = window.innerHeight))
  const editAreaHeight = computed(() => windowHeight.value - ADJUST_HEIGHT)

  const calculateWindowWidth = () => (windowHeight.value = window.innerHeight)
  useEventListener('resize', calculateWindowWidth)

  return {
    treeNodes,
    pageTitle,
    fetchTreeData,
    registerTree,
    cancelTree,
    editAreaHeight
  }
}
