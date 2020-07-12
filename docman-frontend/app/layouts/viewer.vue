<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import DocumentContainer from '~/containers/DocumentContainer'
import PageContainer from '~/containers/PageContainer'
import DrawerContainer from '~/containers/DrawerContainer'

export default defineComponent({
  setup() {
    DocumentContainer.provide()
    PageContainer.provide()
    DrawerContainer.provide()
  }
})
</script>
