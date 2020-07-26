import { nextTick, Ref, watch } from '@vue/composition-api'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import { DisplayMode } from '~/models/EditorDisplayMode'

export const useDisplayMode = (mode: Ref<DisplayMode>) => {
  const { setMode } = DisplayModeContainer.useContainer()

  watch(
    () => mode.value,
    (newVal, oldVal) => {
      if (newVal !== undefined) {
        setMode(newVal)
        return
      }
      nextTick(() => {
        mode.value = oldVal
      })
    }
  )
}
