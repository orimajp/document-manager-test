import { createContainer } from 'vue-unstated'
import { computed, reactive } from '@vue/composition-api'

const useAssetLink = () => {
  const state = reactive({
    fileName: '',
    fileLocation: ''
  })

  const setAsset = (fileName: string, location: string) => {
    console.log(`setAsset(): fileName=${fileName}, locaton=${location}`)
    state.fileName = fileName
    state.fileLocation = location
  }

  const assetFileNameRef = computed(() => {
    return state.fileName
  })

  const assetLocationRef = computed(() => {
    return state.fileLocation
  })

  const clearAsset = () => {
    state.fileName = ''
    state.fileLocation = ''
  }

  return {
    setAsset,
    assetFileNameRef,
    assetLocationRef,
    clearAsset
  }
}

export default createContainer(useAssetLink)
