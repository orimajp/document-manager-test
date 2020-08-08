<template>
  <div>
    <d-ocument-list-navbar />
    <document-list-viewer :list="list" :complete="complete" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
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
    const complete = ref(false)

    search().then((data) => {
      list.value = data
      complete.value = true
    })

    return {
      list,
      complete
    }
  }
})
</script>
