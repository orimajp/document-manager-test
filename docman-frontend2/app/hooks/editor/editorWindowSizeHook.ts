import { computed, Ref, watchEffect } from '@vue/composition-api'
import { useWindowSize } from '@vueuse/core'
import { DisplayMode, DUAL, PREV } from '~/models/EditorDisplayMode'

const calculateEditorWidth = (
  windowWidth: number,
  displayMode: DisplayMode
) => {
  switch (displayMode) {
    case DUAL:
      return windowWidth / 2
    case PREV:
      return 0
    default:
      return windowWidth
  }
}

/* Markdown Editor高さ補正値 */
const ADJUST_HEIGHT = 95

export const useEditorWindowSize = (displayMode: Ref<DisplayMode>) => {
  const { width, height } = useWindowSize()

  const windowHeight = computed(() => height.value - ADJUST_HEIGHT)
  const windowWidth = computed(() =>
    calculateEditorWidth(width.value, displayMode.value)
  )

  const editorHeightStyle = computed(() => `${windowHeight.value}px`)
  const editorWidthStyle = computed(() => `${windowWidth.value}px`)

  watchEffect(() => console.log(`width=${width.value}`))
  watchEffect(() => console.log(`height=${height.value}`))

  return {
    windowHeight,
    windowWidth,
    editorHeightStyle,
    editorWidthStyle
  }
}
