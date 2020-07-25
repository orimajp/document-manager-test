<template>
  <v-app>
    <document-view-tree-drawer />
    <document-view-navbar />
    <nuxt />
    <document-viewe-toc-drawer />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'
import DrawerContainer from '~/containers/DrawerContainer'
import HeadlineContanier from '~/containers/HeadlineContanier'
import DocumentViewNavbar from '~/components/view/DocumentViewNavbar'
import DocumentViewTreeDrawer from '~/components/view/drawer/DocumentViewTreeDrawer'
import DocumentVieweTocDrawer from '~/components/view/drawer/DocumentVieweTocDrawer'

export default defineComponent({
  components: {
    DocumentViewNavbar,
    DocumentViewTreeDrawer,
    DocumentVieweTocDrawer
  },
  setup() {
    DocumentContainer.provide()
    PageContainer.provide()
    DrawerContainer.provide()
    HeadlineContanier.provide()
  }
})
</script>
