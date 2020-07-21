<template>
  <document-view-content :page-content="page" />
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import useRouter from '~/hooks/useRouter'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'
import DocumentViewContent from '~/components/view/DocumentViewContent'

export default defineComponent({
  layout: 'viewer',
  components: {
    DocumentViewContent
  },
  setup() {
    const { route } = useRouter()
    const pageId = route.value.params.key
    console.log(`pageId=${pageId}`)
    const hash = computed(() => route.value.hash)
    console.log(`hash=${hash}`)

    const { page, fetchPage } = PageContainer.useContainer()
    fetchPage(pageId)
    const documentId = page.value.documentId
    console.log(`documentID=${documentId}`)

    const { document, fetchDocument } = DocumentContainer.useContainer()
    if (document.value.documentId !== documentId) {
      fetchDocument(documentId)
    }

    return {
      // document,
      page
    }
  }
})
</script>
