<template>
  <v-app>
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import HeadlineContanier from '~/containers/HeadlineContanier'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
import DarkModeContainer from '~/containers/DarkModeContainer'
import SyncModeContainer from '~/containers/SyncModeContainer'
import EditStateContainer from '~/containers/EditStateContainer'

export default defineComponent({
  setup() {
    // HeadlineContanier.provide()
    DisplayModeContainer.provide()
    EditScrollHandleContainer.provide()
    DarkModeContainer.provide()
    SyncModeContainer.provide()
    EditStateContainer.provide()
  }
})
</script>
