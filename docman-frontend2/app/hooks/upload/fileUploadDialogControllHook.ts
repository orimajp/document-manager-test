import { computed, ref } from '@vue/composition-api'
import { useWindowSize } from '@vueuse/core'
import FileUploadContainer from '~/containers/FileUploadContainer'
import { useFileUpload } from '~/hooks/upload/fileUploadHook'

const ADJUST_HEIGHT = 40

export const fileUploadDialogControll = () => {
  const { height } = useWindowSize()
  const { modal, errorMessage } = FileUploadContainer.useContainer()

  const { uploadFile } = useFileUpload(modal, errorMessage)

  const inArea = ref(false)
  const dialogHeight = computed(() => height.value - ADJUST_HEIGHT)

  const dragover = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('dialog drag over')
  }

  const inAreaDragOver = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    inArea.value = true
  }

  const dragleave = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('dialog drag leave')
    modal.value = false
  }

  const cancelDragLeave = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('cancel drag leave')
  }

  const inAreaDragLeave = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    inArea.value = false
  }

  const drop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('dialog drop')
    const files = event.dataTransfer!.files as FileList
    console.log(files)
    console.log(files.item(0))

    uploadFile(files)
  }

  return {
    dialogHeight,
    modal,
    inArea,
    dragover,
    dragleave,
    drop,
    cancelDragLeave,
    inAreaDragOver,
    inAreaDragLeave
  }
}
