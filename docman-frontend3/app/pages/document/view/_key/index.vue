<script setup lang="ts">
import { computed, ref, useRoute } from '@nuxtjs/composition-api'
import DocumentContainer from '~/containers/document-container'
import PageContainer from '~/containers/page-container'
import DocumentViewContent from '~/components/view/DocumentViewContent.vue'
import LinkedPageMapContainer from '~/containers/linked-page-map-container'
import { DocumentData } from '~/models/document/DocumentData'
import BreadCrumbListContainer from '~/containers/bread-crumb-list-container'
import { useViewIndexSearch } from '~/composables/view/use-view-index-search'

const route = useRoute()

const pageId = route.value.params.key
console.log(`pageId=${pageId}`)
const hash = computed(() => route.value.hash)
console.log(`hash=${hash}`)

const documentId = ref<string | null>(null)

const { page, fetchPage } = PageContainer.useContainer()
const { document, fetchDocument } = DocumentContainer.useContainer()
const { initializePageMap } = LinkedPageMapContainer.useContainer()
const { setPageIdList } = BreadCrumbListContainer.useContainer()
const { available, fetchIndex } = useViewIndexSearch()

// FIXME async/awaitが使えないので無理矢理な処理になっている

fetchPage(pageId).then(() => {
  documentId.value = page.value.documentId
  console.log(`documentID=${documentId.value}`)

  if (documentId.value !== document.value.documentId) {
    // 検索不可設定
    available.value = false

    fetchDocument(documentId.value).then(() => {
      const keyArray = document.value.getNestedIdArray(pageId)
      document.value.openChildren(keyArray)
      initializePageMap(document.value as DocumentData) // FIXME 何故かエラーになるので無理矢理型を合わせている
      setPageIdList(keyArray)
      // 検索インデックス取得
      fetchIndex(documentId.value as string)
    })
    return
  }
  const keyArray = document.value.getNestedIdArray(pageId)
  document.value.openChildren(keyArray)
  initializePageMap(document.value as DocumentData) // FIXME 何故かエラーになるので無理矢理型を合わせている
  setPageIdList(keyArray)
})
</script>

<script lang="ts">
export default {
  layout: 'viewer'
}
</script>

<template>
  <document-view-content :page-content="page" />
</template>
