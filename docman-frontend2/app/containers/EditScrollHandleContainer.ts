import { createContainer } from 'vue-unstated'
import { computed, reactive } from '@vue/composition-api'

const useEditScrollHandle = () => {
  const state = reactive({
    viewerScrollValue: 0,
    editorScrollValue: 0
  })

  const updateViewerScrollValue = (value: number) => {
    state.viewerScrollValue = value
  }

  const updateEditorScrollValue = (value: number) => {
    state.editorScrollValue = value
  }

  const viewerScrollValue = computed(() => {
    return state.viewerScrollValue > 1 ? 1 : state.viewerScrollValue
  })

  const editorScrollValue = computed(() => {
    return state.editorScrollValue > 1 ? 1 : state.editorScrollValue
  })

  return {
    updateViewerScrollValue,
    updateEditorScrollValue,
    viewerScrollValue,
    editorScrollValue
  }
}

export default createContainer(useEditScrollHandle)
