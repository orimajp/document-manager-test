<template>
  <div />
</template>

<script lang="ts">
import { defineComponent, useContext } from 'nuxt-composition-api'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'

export default defineComponent({
  setup() {
    const { params } = useContext()
    const pageId = params.value.key
    console.log(`pageId=${pageId}`)

    const { page, fetchPage } = PageContainer.useContainer()
    fetchPage(pageId)
    const documentId = page.value.documentId
    console.log(`documentID=${documentId}`)

    const { document, fetchDocument } = DocumentContainer.useContainer()
    if (document.value.documentId !== documentId) {
      fetchDocument(documentId)
    }

    return {
      document,
      page
    }
  }
})
</script>

<style></style>
