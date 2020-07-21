<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import HeadlineCotanier from '~/containers/HeadlineCotanier'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'

export default defineComponent({
  setup() {
    // HeadlineCotanier.provide()
    DisplayModeContainer.provide()
    EditScrollHandleContainer.provide()
  }
})
</script>
