<template>
  <v-main>
    <v-container fluid>
      <div ref="viewer">
        <h1 class="document-title">{{ pageTitle }}</h1>
        <div class="markdown-body">
          <div>{{ pageData }}</div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from '@vue/composition-api'
import { PageData } from '~/models/page/PageData'
import { PageContentProp, useViewContent } from '~/hooks/view/viewContentHook'
import { useCollectHeadline } from '~/hooks/view/viewCollectHeadlineHook'
import { useNavigate } from '~/hooks/view/viewNavigateHook'

export default defineComponent({
  props: {
    pageContent: Object as PropType<PageData>
  },
  setup(props: PageContentProp) {
    const { pageTitle, pageData } = useViewContent(props)

    const viewer = ref(null) as Ref<HTMLElement | null> // ref=viewer相当
    useCollectHeadline(props, viewer)
    useNavigate(viewer)

    return {
      viewer,
      pageTitle,
      pageData
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
</style>
