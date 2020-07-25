<template>
  <v-main>
    <v-container>
      <div ref="viewer">
        <h1 class="document-title">{{ pageTitle }}</h1>
        <div class="markdown-body">
          <div v-html="$md.render(pageData)" />
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
  PropType,
  Ref,
  ref
} from '@vue/composition-api'
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

    const { addNavigateListener, removeNavigateListener } = useNavigate()

    // FIXME addNavigateListener()の実行が空振ってしまうので無理矢理タイマで待ち合わせる
    onMounted(() => {
      window.setTimeout(() => {
        nextTick(() => {
          addNavigateListener(viewer)
        })
      }, 200)
    })

    onUnmounted(() => {
      removeNavigateListener()
    })

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
