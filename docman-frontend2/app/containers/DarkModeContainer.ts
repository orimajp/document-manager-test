import { createContainer } from 'vue-unstated'
import { reactive, toRefs } from '@vue/composition-api'

const useDarkMode = () => {
  const state = reactive({
    darkMode: false
  })

  return {
    ...toRefs(state)
  }
}

export default createContainer(useDarkMode)
