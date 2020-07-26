import { createContainer } from 'vue-unstated'
import { reactive, toRefs } from '@vue/composition-api'

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
