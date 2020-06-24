import { getRuntimeVM } from '~/utils/runtime'

export const useAxios = () => {
  const vm = getRuntimeVM()

  return {
    axios: vm.$axios
  }
}
