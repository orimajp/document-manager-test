<script setup lang="ts">
// import DocumentContainer from '~/containers/DocumentContainer'
// import PageContainer from '~/containers/PageContainer'
// import DrawerContainer from '~/containers/DrawerContainer'
// import HeadlineContanier from '~/containers/HeadlineContanier'
import DocumentViewNavbar from '~/components/view/DocumentViewNavbar.vue'
import DocumentViewTreeDrawer from '~/components/view/drawer/DocumentViewTreeDrawer.vue'
import DocumentVieweTocDrawer from '~/components/view/drawer/DocumentVieweTocDrawer.vue'
// import LinkedPageMapContainer from '~/containers/LinkedPageMapContainer'
// import BreadCrumbListContainer from '~/containers/BreadCrumbListContainer'
// import SnackbarComboContainer from '~/containers/SnackbarComboContainer'
import SnackbarCombo from '~/components/SnackbarCombo.vue'
// import LunrIndexContainer from '~/containers/LunrIndexContainer'

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
