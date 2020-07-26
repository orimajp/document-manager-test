import { computed } from '@vue/composition-api'
import DisplayModeContainer from '~/containers/DisplayModeContainer'

const FULL_WIDTH = 12
const HALF_WIDTH = 6
const NONE = 0

export const useEditorPaneColumn = () => {
  const { editMode, prevMode } = DisplayModeContainer.useContainer()

  const displayEditFormCols = computed(() => {
    if (prevMode) {
      return NONE
    }
    if (editMode) {
      return FULL_WIDTH
    }
    return HALF_WIDTH
  })

  const displayPreviewAreaCols = computed(() => {
    if (prevMode) {
      return FULL_WIDTH
    }
    if (editMode) {
      return NONE
    }
    return HALF_WIDTH
  })

  return {
    displayEditFormCols,
    displayPreviewAreaCols
  }
}
