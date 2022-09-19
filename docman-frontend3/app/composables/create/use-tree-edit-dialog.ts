import {
  computed,
  onMounted,
  ref,
//  SetupContext,
  watchEffect
} from '@nuxtjs/composition-api'
import { useEventListener } from '@vueuse/core'
import { useTreeEditData } from '~/composables/tree/use-tree-edit-data'
import { useTreeEditRouter } from '~/composables/tree/use-tree-edit-router'
import { TreeEditDialogControllProps } from '~/composables/create/use-tree-edit-daialog-controll'

/* 高さ補正値 */
const ADJUST_HEIGHT = 136

/* ヘッダ・フッタ補正 */
const HEADER_FOOTER_HEIGHT = 117

/*
interface Emits {
  (e: 'closeDialog'): void
}
const emit = defineEmits<Emits>()
*/

export const useTreeEditDialog = (
  props: TreeEditDialogControllProps,
  closeDialog: () => void,
//  contest: SetupContext
) => {
  const showModal = computed<boolean>({
    get: () => props.treeEditDialogControllMenu.showModal,
//    set: () => contest.emit('closeDialog')
//    set: () => emit('closeDialog')
    set: () => closeDialog()
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
