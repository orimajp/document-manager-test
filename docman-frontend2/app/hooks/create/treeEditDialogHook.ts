import {
  computed,
  onMounted,
  ref,
  SetupContext,
  watchEffect
} from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import { useTreeEditData } from '~/hooks/tree/treeEditDataHook'
import { useTreeEditRouter } from '~/hooks/tree/treeEditRouterHook'
import { TreeEditDialogControllProps } from '~/hooks/create/treeEditDialogControllHook'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

/* ヘッダ・フッタ補正 */
const HEADER_FOOTER_HEIGHT = 117

export const useTreeEditDialog = (
  props: TreeEditDialogControllProps,
  contest: SetupContext
) => {
  const showModal = computed<boolean>({
    get: () => props.treeEditDialogControllMenu.showModal,
    set: () => contest.emit('closeDialog')
  })
  const pageId = computed(() => props.treeEditDialogControllMenu.pageId)

  const { treeNodes, pageTitle, updateNode, fetchTreeData } = useTreeEditData()
  const { registerTree, cancelTree } = useTreeEditRouter(updateNode)

  watchEffect(() => {
    if (showModal.value) {
      fetchTreeData(pageId.value)
    }
  })

  const registerTreeData = () => {
    return registerTree(pageId.value)
  }
  const cancelTreeData = () => {
    return cancelTree(pageId.value)
  }

  const windowHeight = ref(0)
  onMounted(() => (windowHeight.value = window.innerHeight))
  const editAreaHeightStyle = computed(
    () => windowHeight.value - ADJUST_HEIGHT - HEADER_FOOTER_HEIGHT + 'px'
  )
  const dialogAreaHeight = computed(() => windowHeight.value - ADJUST_HEIGHT)
  useEventListener('resize', () => (windowHeight.value = window.innerHeight))

  return {
    showModal,
    pageId,
    treeNodes,
    pageTitle,
    registerTreeData,
    cancelTreeData,
    editAreaHeightStyle,
    dialogAreaHeight
  }
}
