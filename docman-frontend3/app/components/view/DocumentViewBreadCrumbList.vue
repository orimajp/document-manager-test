<script setup lang="ts">
import { useViewBreadCrumbList } from '~/composables/view/use-view-bread-crumb-list'

const {
  bottomPageTitle,
  linkedPageItems,
  createLink
} = useViewBreadCrumbList()
</script>

<template>
  <div class="bread-crumb-box">
    <span
      v-for="(item, index) in linkedPageItems"
      :key="index"
      class="bread-crumb-link"
    >
      <nuxt-link :to="createLink(item.pageId)" style="text-decoration: none">
        {{ item.pageTitle }}
      </nuxt-link>
      <v-icon x-small color="grey">mdi-chevron-double-right</v-icon>
    </span>
    <span class="current-pate-title">{{ bottomPageTitle }}</span>
  </div>
</template>

<style scoped>
.bread-crumb-box {
  line-height: 1.2;
}
.bread-crumb-link {
  font-size: 12px;
}
.current-pate-title {
  font-size: 12px;
  color: grey;
}
</style>
