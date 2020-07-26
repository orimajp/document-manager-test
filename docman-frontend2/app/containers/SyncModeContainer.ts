import { createContainer } from 'vue-unstated'
import { reactive, toRefs } from '@vue/composition-api'

const useSyncMode = () => {
  const state = reactive({
    syncMode: true
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useSyncMode)
