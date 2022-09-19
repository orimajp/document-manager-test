import { reactive, toRefs } from "@nuxtjs/composition-api"
import lunr from 'lunr'
import { createContainer } from "./create-container"
import { IIndex } from '~/models/index/IIndex'

const useLunrIndex = () => {
  const state = reactive({
    searchIndex: {} as lunr.Index,
    pageIndex: [] as Array<IIndex>,
    available: false,
    searchKeyword: ''
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useLunrIndex)
