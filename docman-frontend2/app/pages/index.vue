<template>
  <div>
    <d-ocument-list-navbar />
    <document-list-viewer :list="list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api'
import { IDocumentList } from '../models/document/IDocumentList'
import { useDocument } from '~/hooks/useDocument'
import DOcumentListNavbar from '~/components/list/DocumentListNavbar'
import DocumentListViewer from '~/components/list/DocumentListViewer'

export default defineComponent({
  components: {
    DOcumentListNavbar,
    DocumentListViewer
  },
  setup() {
    const { search } = useDocument()
    const list = ref<Array<IDocumentList>>([])
    watchEffect(async () => {
      list.value = await search()
    })
    console.log('index')
    console.log(list)
    return {
      list
    }
  }
})
</script>
