<template>
  <v-main>
    <v-container fluid>
      <h1 class="document-title">{{ pageTitle }}</h1>
      <div class="markdown-body">
        <div>{{ pageData }}</div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { PageData } from '~/models/page/PageData'
import { PageContentProp, useViewContent } from '~/hooks/view/viewContentHook'

export default defineComponent({
  props: {
    pageContent: Object as PropType<PageData>
  },
  setup(props: PageContentProp) {
    const { pageTitle, pageData } = useViewContent(props)

    return {
      pageTitle,
      pageData
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
</style>
