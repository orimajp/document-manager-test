import { computed, reactive, toRefs, watch } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

const useFileUpload = () => {
  const state = reactive({
    dragging: false,
    modal: false,
    errorMessage: ''
  })

  // FIXME ループするリスクあり

  watch(
    () => state.dragging,
    (newVal) => {
      if (newVal) {
        state.modal = true
      }
      state.dragging = newVal
      console.log(`dragging=${state.dragging}`)
    }
  )

  watch(
    () => state.modal,
    (newVal) => {
      if (!newVal) {
        state.dragging = false
      }
      state.modal = newVal
      console.log(`modal=${state.modal}`)
    }
  )

  const errroModal = computed({
    get: () => state.errorMessage !== '',
    set: (newVal) => {
      if (!newVal) {
        state.errorMessage = ''
        state.modal = false
      }
    }
  })

  return {
    ...toRefs(state),
    errroModal
  }
}

export default createContainer(useFileUpload)
