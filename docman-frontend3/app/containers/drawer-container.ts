import { computed } from "@nuxtjs/composition-api"
import { useStorage } from "@vueuse/core"
import { createContainer } from "./create-container"

// vueuseが新しいバージョンだとエラーになるのでちょっと古いのを使っている

const useDrawer = () => {
  const state = useStorage('docman-drawer-settings', {
    permanent: true,
    drawer: false
  })

  const isPermanent = computed(() => state.value.permanent)

  const setPermanent = (permanent: boolean): void => {
    state.value.permanent = permanent
  }

  const isDrawer = computed(() => state.value.drawer)

  const setDrawer = (drawer: boolean): void => {
    state.value.drawer = drawer
  }

  const drawer = computed<boolean>({
    get: () => state.value.drawer,
    set: (newState: boolean) => (state.value.drawer = newState)
  })

  const permanent = computed<boolean>({
    get: () => state.value.permanent,
    set: (newState: boolean) => (state.value.permanent = newState)
  })

  return {
    drawer,
    permanent,
    isPermanent,
    setPermanent,
    isDrawer,
    setDrawer
  }
}

export default createContainer(useDrawer)
