<script setup lang="ts">
import { ref } from '@nuxtjs/composition-api'
import { IDocumentList } from '~/models/document/IDocumentList'
// @ts-ignore
import DocumentListNavbar from '~/components/list/DocumentListNavbar.vue'
// @ts-ignore
import DocumentListViewer from '~/components/list/DocumentListViewer.vue'
import { useDocument } from '~/composables/use-document'

const { search } = useDocument()

const list = ref<Array<IDocumentList>>([])
const complete = ref(false)

search().then((data) => {
  list.value = data
  complete.value = true
})
</script>

<template>
  <div>
    <document-list-navbar />
    <document-list-viewer :list="list" :complete="complete" />
  </div>
</template>
