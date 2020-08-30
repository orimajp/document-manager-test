import { createContainer } from 'vue-unstated'
import { computed, reactive, toRefs } from '@vue/composition-api'

const useSnackbarCombo = () => {
  const state = reactive({
    infoMessage: '',
    warningMessage: '',
    alertMessage: ''
  })

  const infoDialog = computed<boolean>({
    get: () => state.infoMessage !== '',
    set: () => (state.infoMessage = '')
  })

  const warningDialog = computed<boolean>({
    get: () => state.warningMessage !== '',
    set: () => (state.warningMessage = '')
  })

  const alertDialog = computed<boolean>({
    get: () => state.alertMessage !== '',
    set: () => (state.alertMessage = '')
  })

  return {
    ...toRefs(state),
    infoDialog,
    warningDialog,
    alertDialog
  }
}

export default createContainer(useSnackbarCombo)
