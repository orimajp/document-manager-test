import {
  computed,
  nextTick,
  onMounted,
  ref,
  Ref,
//  SetupContext,
  watch
} from '@nuxtjs/composition-api'
import { DisplayMode, DUAL, EDIT, PREV } from '~/models/EditorDisplayMode'
import SyncModeContainer from '~/containers/sync-mode-container'
import DarkModeContainer from '~/containers/dark-mode-container'
import DisplayModeContainer from '~/containers/display-mode-container'

/*
interface Emits {
  (e: 'goTop'): void
  (e: 'updateTitle', newTitle: string): void
}
const emit = defineEmits<Emits>()
*/

export interface EditorNavbarProps {
  pageTitle: string
  documentEdit: boolean
  createMode: boolean
}

export const useEditorNavbar = (
  props: EditorNavbarProps,
//  context: SetupContext
) => {
  const editTarget = computed(() => (props.documentEdit ? 'D' : 'P'))

  const { darkMode } = DarkModeContainer.useContainer()
  const { syncMode } = SyncModeContainer.useContainer()
  const option = ref(['SYNC']) as Ref<Array<string>>
  watch(
    () => option.value,
    (value) => {
      darkMode.value = value.includes('DARK')
      syncMode.value = value.includes('SYNC')
    }
  )

  const editValue = EDIT as DisplayMode
  const dualValue = DUAL as DisplayMode
  const prevValue = PREV as DisplayMode
  const { displayMode } = DisplayModeContainer.useContainer()
  // ボタン連打対策
  watch(
    () => displayMode.value,
    (newVal, oldVal) => {
      if (newVal !== undefined) {
        displayMode.value = newVal
        return
      }
      nextTick(() => {
        displayMode.value = oldVal
      })
    }
  )

  /*
  const goTop = () => {
//    context.emit('goTop')
    emit('goTop')
  }

  const updateTitle = (newTitle: string) => {
//    context.emit('updateTitle', newTitle)
    emit('updateTitle', newTitle)
  }
  */

  const titleField = ref(null) as Ref<HTMLElement | null>
  onMounted(() => {
    if (props.createMode) {
      nextTick(() => {
        titleField.value?.focus()
      })
    }
  })

  return {
    titleField,
    editTarget,
    option,
    mode: displayMode,
    editValue,
    dualValue,
    prevValue,
//    goTop,
//    updateTitle
  }
}
