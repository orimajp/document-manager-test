import { computed } from '@nuxtjs/composition-api'
import DisplayModeContainer from '~/containers/display-mode-container'

const FULL_WIDTH = 12
const HALF_WIDTH = 6
const NONE = 0

export const useEditorPaneColumn = () => {
  const { editMode, prevMode } = DisplayModeContainer.useContainer()

  const displayEditFormCols = computed(() => {
    if (prevMode.value) {
      return NONE
    }
    if (editMode.value) {
      return FULL_WIDTH
    }
    return HALF_WIDTH
  })

  const displayPreviewAreaCols = computed(() => {
    if (prevMode.value) {
      return FULL_WIDTH
    }
    if (editMode.value) {
      return NONE
    }
    return HALF_WIDTH
  })

  return {
    displayEditFormCols,
    displayPreviewAreaCols
  }
}
