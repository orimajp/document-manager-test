import { computed, reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"
import { DisplayMode, DUAL, EDIT, PREV } from '~/models/EditorDisplayMode'

const useEditMode = () => {
  const state = reactive({
    displayMode: DUAL as DisplayMode
  })

  const setMode = (mode: DisplayMode) => {
    state.displayMode = mode
  }

  const setEditMOde = () => {
    setMode(EDIT)
  }

  const setDualMode = () => {
    setMode(DUAL)
  }

  const setPrevMode = () => {
    setMode(PREV)
  }

  const editMode = computed(() => {
    return state.displayMode === EDIT
  })

  const dualMode = computed(() => {
    return state.displayMode === DUAL
  })

  const prevMode = computed(() => {
    return state.displayMode === PREV
  })

  return {
    ...toRefs(state),
    setMode,
    setEditMOde,
    setDualMode,
    setPrevMode,
    editMode,
    dualMode,
    prevMode
  }
}

export default createContainer(useEditMode)
