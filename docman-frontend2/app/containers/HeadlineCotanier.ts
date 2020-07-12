import { reactive, toRefs } from '@vue/composition-api'
import { createContainer } from 'vue-unstated'
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
