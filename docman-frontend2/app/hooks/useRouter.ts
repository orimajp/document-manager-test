// https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
import { reactive, toRefs, watch } from '@vue/composition-api'
import { Route } from 'vue-router'
import { getRuntimeVM } from '~/utils/runtime'

type State = {
  route: Route
}

export const useRouter = () => {
  const vm = getRuntimeVM()
  const state = reactive<State>({
    route: vm.$route
  })

  watch(
    () => vm.$route,
    (r) => {
      //  state.route = r as any
      state.route = r
    }
  )

  return { ...toRefs(state), router: vm.$router }
}
