import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

const useSyncMode = () => {
  const state = reactive({
    syncMode: true
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useSyncMode)
