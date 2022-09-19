import { reactive, toRefs } from "@nuxtjs/composition-api"
import { createContainer } from "./create-container"
import { LinkedPageMap } from '~/models/page/LinkedPageMap'
import { DocumentData } from '~/models/document/DocumentData'
import { createLinkedPageMap } from '~/models/page/LinkedPageMapFactory'

const initMap = new LinkedPageMap()

const useLinkedPageMap = () => {
  const state = reactive({
    pageMap: initMap
  })

  const initializePageMap = (document: DocumentData) => {
    state.pageMap = createLinkedPageMap(document)
  }

  const getLinkedPageItem = (pageId: string) => {
    return state.pageMap.getLinkedPageItem(pageId)
  }

  return {
    ...toRefs(state),
    initializePageMap,
    getLinkedPageItem
  }
}

export default createContainer(useLinkedPageMap)
