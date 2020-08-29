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
      <v-icon x-small>mdi-chevron-double-right</v-icon>
    </span>
    <span class="current-pate-title">{{ bottomPageTitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useViewBreadCrumbList } from '~/hooks/view/viewBreadCrumbListHook'

export default defineComponent({
  setup() {
    const {
      bottomPageTitle,
      linkedPageItems,
      createLink
    } = useViewBreadCrumbList()

    return {
      bottomPageTitle,
      linkedPageItems,
      createLink
    }
  }
})
</script>

<style scoped>
.bread-crumb-box {
  line-height: 1.2;
}
.bread-crumb-link {
  font-size: 12px;
}
.current-pate-title {
  font-size: 12px;
}
</style>
