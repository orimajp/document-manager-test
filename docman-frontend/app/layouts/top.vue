<template>
  <v-app>
    <top-navbar />
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'nuxt-composition-api'
import TopNavbar from '~/components/TopNavbar'

export default defineComponent({
  components: {
    TopNavbar
  }
})
</script>

<style></style>
