// import { reactive, toRefs } from 'nuxt-composition-api'
// import { reactive } from 'nuxt-composition-api'
import { createContainer } from 'vue-unstated'
import { useStorage } from '@vueuse/core'

const useDrawer = () => {
  /*
  const state = reactive({
    permanent: true,
    drawer: false
  })
   */

  const state = useStorage('docman-settings', {
    permanent: true,
    drawer: false
  })

  const isPermanent = (): boolean => {
    // return state.permanent
    return state.value.permanent
  }

  const setPermanent = (permanent: boolean): void => {
    // state.permanent = permanent
    state.value.permanent = permanent
  }

  const isDrawer = (): boolean => {
    // return state.drawer
    return state.value.drawer
  }

  const setDrawer = (drawer: boolean): void => {
    // state.drawer = drawer
    state.value.drawer = drawer
  }

  return {
    // ...toRefs(state)
    isPermanent,
    setPermanent,
    isDrawer,
    setDrawer
  }
}

export default createContainer(useDrawer)
