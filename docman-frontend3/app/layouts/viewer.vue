<script setup lang="ts">
// @ts-ignore
import DocumentViewNavbar from '~/components/view/DocumentViewNavbar.vue'
// @ts-ignore
import DocumentViewTreeDrawer from '~/components/view/drawer/DocumentViewTreeDrawer.vue'
// @ts-ignore
import DocumentVieweTocDrawer from '~/components/view/drawer/DocumentVieweTocDrawer.vue'
// @ts-ignore
import SnackbarCombo from '~/components/SnackbarCombo.vue'
import DocumentContainer from '~/containers/document-container'
import PageContainer from '~/containers/page-container'
import DrawerContainer from '~/containers/drawer-container'
import HeadlineContanier from '~/containers/headline-container'
import LinkedPageMapContainer from '~/containers/linked-page-map-container'
import BreadCrumbListContainer from '~/containers/bread-crumb-list-container'
import SnackbarComboContainer from '~/containers/snackbar-container'
import LunrIndexContainer from '~/containers/lunr-index-container'

DocumentContainer.provide()
PageContainer.provide()
DrawerContainer.provide()
HeadlineContanier.provide()
LinkedPageMapContainer.provide()
BreadCrumbListContainer.provide()
SnackbarComboContainer.provide()
LunrIndexContainer.provide()
</script>

<script lang="ts">
export default {
  // eslint-disable-next-line
  name: "viewer",
}
</script>

<template>
  <v-app>
    <snackbar-combo />
    <document-view-tree-drawer />
    <document-view-navbar />
    <nuxt />
    <document-viewe-toc-drawer />
  </v-app>
</template>
