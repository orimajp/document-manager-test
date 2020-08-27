<template>
  <v-main>
    <v-container fluid>
      <div ref="viewer">
        <h1 class="document-title">{{ pageTitle }}</h1>
        <div class="markdown-content">
          <div class="date-data">
            {{ contentDate }}
          </div>
        </div>
        <div class="markdown-body">
          <div v-html="$md.render(pageData)" />
        </div>
      </div>
      <document-view-navigation class="navigation" :page-id="pageId" />
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {
  computed,
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
import DocumentViewNavigation from '~/components/view/DocumentViewNavigation.vue'

export default defineComponent({
  components: {
    DocumentViewNavigation
  },
  props: {
    pageContent: Object as PropType<PageData>
  },
  setup(props: PageContentProp) {
    const {
      pageId,
      pageTitle,
      pageData,
      createdAt,
      updatedAt,
      goHash,
      formatDate
    } = useViewContent(props)

    const viewer = ref(null) as Ref<HTMLElement | null> // ref=viewer相当
    useCollectHeadline(props, viewer)

    const { addNavigateListener, removeNavigateListener } = useNavigate()

    // FIXME addNavigateListener()の実行が空振ってしまうので無理矢理タイマで待ち合わせる
    onMounted(() => {
      window.setTimeout(() => {
        nextTick(() => {
          addNavigateListener(viewer)
          goHash()
        })
      }, 200)
    })

    onUnmounted(() => {
      removeNavigateListener()
    })

    const contentDate = computed(
      // () => `作成: ${createdAt.value} 更新: ${updatedAt.value}`
      () =>
        `作成: ${formatDate(createdAt.value)} 更新: ${formatDate(
          updatedAt.value
        )}`
    )

    return {
      viewer,
      pageId,
      pageTitle,
      pageData,
      contentDate
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
.navigation {
  margin-top: 40px;
  margin-bottom: 80px;
}
</style>
