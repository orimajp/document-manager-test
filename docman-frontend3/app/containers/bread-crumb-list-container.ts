import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"

const useBreadCrumbList = () => {
  const state = reactive({
    pageIds: [] as Array<string>
  })

  const initializeList = () => {
    state.pageIds = []
  }

  const setPageIdList = (ids: Array<string>) => {
    state.pageIds = ids
  }

  return {
    ...toRefs(state),
    initializeList,
    setPageIdList
  }
}

export default createContainer(useBreadCrumbList)
