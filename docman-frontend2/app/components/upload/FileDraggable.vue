<template>
  <div @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FileUploadContainer from '~/containers/FileUploadContainer'

export default defineComponent({
  setup() {
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

    return {
      dragover,
      drop,
      dragleave
    }
  }
})
</script>
