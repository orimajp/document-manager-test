// https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
import Vue from 'vue'
import { getCurrentInstance } from '@vue/composition-api'

export const getRuntimeVM = (): Vue => {
  const vm = getCurrentInstance()
  if (vm) {
    return vm
  }

  throw new ReferenceError('[vue-hooks] Not found vue instance.')
}
