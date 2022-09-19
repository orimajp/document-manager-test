import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"
import { DocumentHeadline } from '~/models/document/DocumentHeadline'

const useHeadline = () => {
  const state = reactive({
    headlines: [] as Array<DocumentHeadline>
  })

  const clearHeadlines = () => {
    state.headlines = [] as Array<DocumentHeadline>
  }

  const addHeadline = (headline: DocumentHeadline) => {
    state.headlines.push(headline)
  }

  return {
    ...toRefs(state),
    clearHeadlines,
    addHeadline
  }
}

export default createContainer(useHeadline)
