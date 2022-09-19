<script setup lang="ts">
import FileUploadContainer from '~/containers/file-upload-container'

const { dragging } = FileUploadContainer.useContainer()

const dragover = () => {
  console.log('drag over')
  dragging.value = true
}

const drop = () => {
  console.log('drop.')
  dragging.value = false
}

const dragleave = () => {
  console.log('drag leave.')
  // dragging.value = false
}

</script>

<template>
  <div @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <slot />
  </div>
</template>
