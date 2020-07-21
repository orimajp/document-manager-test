<template>
  <document-previewer />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DocumentPreviewer from '~/components/viewer/DocumentPreviewer'

export default defineComponent({
  layout: 'editor',
  components: {
    DocumentPreviewer
  }
})
</script>

<style></style>
