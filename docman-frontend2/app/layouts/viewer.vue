<template>
  <v-app>
    <snackbar-combo />
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
import LinkedPageMapContainer from '~/containers/LinkedPageMapContainer'
import BreadCrumbListContainer from '~/containers/BreadCrumbListContainer'
import SnackbarComboContainer from '~/containers/SnackbarComboContainer'
import SnackbarCombo from '~/components/SnackbarCombo'
import LunrIndexContainer from '~/containers/LunrIndexContainer'

export default defineComponent({
  components: {
    SnackbarCombo,
    DocumentViewNavbar,
    DocumentViewTreeDrawer,
    DocumentVieweTocDrawer
  },
  setup() {
    DocumentContainer.provide()
    PageContainer.provide()
    DrawerContainer.provide()
    HeadlineContanier.provide()
    LinkedPageMapContainer.provide()
    BreadCrumbListContainer.provide()
    SnackbarComboContainer.provide()
    LunrIndexContainer.provide()
  }
})
</script>
