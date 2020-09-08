import { reactive, toRefs } from '@vue/composition-api'
import lunr from 'lunr'
import { createContainer } from 'vue-unstated'
import { IIndex } from '~/models/index/IIndex'

const useLunrIndex = () => {
  const state = reactive({
    searchIndex: {} as lunr.Index,
    pageIndex: [] as Array<IIndex>,
    available: false
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useLunrIndex)
