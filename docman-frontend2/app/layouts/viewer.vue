<template>
  <v-app>
    <document-view-tree-drawer />
    <nuxt />
    <document-viewe-toc-drawer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'
import DrawerContainer from '~/containers/DrawerContainer'
import HeadlineCotanier from '~/containers/HeadlineCotanier'
import DocumentViewTreeDrawer from '~/components/view/drawer/DocumentViewTreeDrawer'
import DocumentVieweTocDrawer from '~/components/view/drawer/DocumentVieweTocDrawer'

export default defineComponent({
  components: {
    DocumentViewTreeDrawer,
    DocumentVieweTocDrawer
  },
  setup() {
    DocumentContainer.provide()
    PageContainer.provide()
    DrawerContainer.provide()
    HeadlineCotanier.provide()
  }
})
</script>
