<script setup lang="ts">
import DrawerContainer from '~/containers/drawer-container'
import { useViewNavbar } from '~/composables/view/use-view-navbar'

const { permanent } = DrawerContainer.useContainer()

const {
  openDrawer,
  pageTitle,
  canTreeEdit,
  goTop,
  goPageCreate,
  goPageEdit,
  goTreeEdit
} = useViewNavbar()
</script>

<template>
  <v-app-bar app clipped-left clipped-right dark dense class="primary">
    <v-app-bar-nav-icon v-if="!permanent" @click="openDrawer" />
    <v-btn icon @click="goTop">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-toolbar-title>
      <small>{{ pageTitle }}</small>
    </v-toolbar-title>
    <v-spacer />
    <v-btn color="info" depressed @click="goPageCreate">新規</v-btn>
    <v-btn color="info" class="toolbar-button" depressed @click="goPageEdit">
      編集
    </v-btn>
    <v-btn
      color="success"
      depressed
      class="toolbar-button"
      :disabled="!canTreeEdit"
      @click="goTreeEdit"
    >
      階層編集
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.toolbar-button {
  margin-left: 7px;
}
</style>
