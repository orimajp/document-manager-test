import { useWindowSize } from '@vueuse/core'
import { computed, Ref } from '@nuxtjs/composition-api'
import { DisplayMode, DUAL, EDIT } from '~/models/EditorDisplayMode'

const calculateViewerWidth = (
  windowWidth: number,
  displayMode: DisplayMode
) => {
  switch (displayMode) {
    case DUAL:
      return windowWidth / 2
    case EDIT:
      return 0
    default:
      return windowWidth
  }
}

export const useViewerWindowSize = (displayMode: Ref<DisplayMode>) => {
  const { width } = useWindowSize()

  const viewerWidth = computed(() => {
    return calculateViewerWidth(width.value, displayMode.value)
  })

  const viewerWidthStlye = computed(() => {
    return `${viewerWidth.value}px`
  })

  return {
    // width,
    viewerWidth,
    viewerWidthStlye
  }
}
