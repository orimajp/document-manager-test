import { Ref } from '@vue/composition-api'
import { useAssetApi } from '~/hooks/assetApiHook'
import AssetLinkContainer from '~/containers/AssetLinkContainer'

// const MAX_FILE_SIZE = 1024
const MAX_FILE_SIZE = 1024000
const UPLOAD_TYPES = ['image/jpeg', 'image/png', 'image/gif']

const validateFileType = (type: string) => {
  return UPLOAD_TYPES.includes(type)
}

const validateFiles = (files: FileList) => {
  if (files.length > 1) {
    return '複数のファイルを同時にアップロードできません。'
  }

  const file = files.item(0) as File
  console.log(`name=${file.name}, size=${file.size}, type=${file.type}`)

  if (!validateFileType(file.type)) {
    return 'イメージファイルのみアップロード可能です。'
  }

  if (file.size === 0) {
    return '空のファイルはアップロードできません。'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'アップロードファイルが大きすぎます。'
  }

  return ''
}

export const useFileUpload = (
  uploadModal: Ref<boolean>,
  errorMessage: Ref<string>
) => {
  const { uploadAsset } = useAssetApi()
  const { setAsset, clearAsset } = AssetLinkContainer.useContainer()

  const uploadFile = (files: FileList) => {
    clearAsset()

    const message = validateFiles(files)

    if (message !== '') {
      console.log(`message=${message}`)
      errorMessage.value = message
      return
    }

    const file = files.item(0) as File

    uploadAsset(file)
      .then((response) => {
        console.log(response)
        console.log(
          `fileName=${response.fileName}, location=${response.location}`
        )
        setAsset(response.fileName, response.location)
        uploadModal.value = false
      })
      .catch((err) => {
        console.log('アップロードエラー') // TODO
        console.log(err)
        errorMessage.value = 'アップロードエラー'
      })
  }

  return {
    uploadFile
  }
}
