import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

const useEditState = () => {
  const state = reactive({
    change: false,
    savePage: false
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useEditState)
