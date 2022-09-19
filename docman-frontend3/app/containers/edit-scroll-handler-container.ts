import { computed, reactive } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

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
