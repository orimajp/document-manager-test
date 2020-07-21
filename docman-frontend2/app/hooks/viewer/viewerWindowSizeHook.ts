import { useWindowSize } from '@vueuse/core'
import { computed, Ref } from '@vue/composition-api'
// import { PageContentProp } from '~/hooks/view/viewContentHook'
import { DisplayMode, DUAL, EDIT } from '~/models/EditorDisplayMode'

/*
interface PreviewProp extends PageContentProp {
  displayMode: DisplayMode
}
*/

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
    return `${viewerWidth}px`
  })

  return {
    // width,
    viewerWidth,
    viewerWidthStlye
  }
}
