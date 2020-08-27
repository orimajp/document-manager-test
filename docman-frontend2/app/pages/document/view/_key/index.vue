<template>
  <document-view-content :page-content="page" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'
import DocumentViewContent from '~/components/view/DocumentViewContent'
import { useRouter } from '~/hooks/useRouter'
import LinkedPageMapContainer from '~/containers/LinkedPageMapContainer'
import { DocumentData } from '~/models/document/DocumentData'

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

    const documentId = ref<string | null>(null)

    const { page, fetchPage } = PageContainer.useContainer()
    const { document, fetchDocument } = DocumentContainer.useContainer()
    const { initializePageMap } = LinkedPageMapContainer.useContainer()

    // FIXME async/awaitが使えないので無理矢理な処理になっている
    fetchPage(pageId).then(() => {
      documentId.value = page.value.documentId
      console.log(`documentID=${documentId.value}`)
      if (documentId.value !== document.value.documentId) {
        fetchDocument(documentId.value).then(() => {
          const keyArray = document.value.getNestedIdArray(pageId)
          document.value.openChildren(keyArray)
          initializePageMap(document.value as DocumentData) // FIXME 何故かエラーになるので無理矢理型を合わせている
        })
        return
      }
      const keyArray = document.value.getNestedIdArray(pageId)
      document.value.openChildren(keyArray)
      initializePageMap(document.value as DocumentData) // FIXME 何故かエラーになるので無理矢理型を合わせている
    })

    return {
      page
    }
  }
})
</script>
