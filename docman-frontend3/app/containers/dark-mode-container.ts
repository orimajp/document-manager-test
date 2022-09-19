import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

const useDarkMode = () => {
  const state = reactive({
    darkMode: false
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useDarkMode)
