<template>
  <v-main>
    <v-container fluid>
      <document-view-bread-crumb-list class="bread-crumb-block" />
      <div ref="viewer">
        <h1 class="document-title">{{ pageTitle }}</h1>
        <div class="markdown-content">
          <div class="date-data">作成 {{ createdDateTime }}</div>
          <div class="date-data">更新 {{ updatedDateTime }}</div>
        </div>
        <div class="markdown-body">
          <div v-html="$md.render(pageData)" />
        </div>
      </div>
      <document-view-navigation class="navigation" :page-id="pageId" />
      <document-view-headline-menu
        :headline-menu-param="headlineMenuParam"
        @closeHeadlineMenu="closeHeadlineMenu"
      />
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
import DocumentViewNavigation from '~/components/view/DocumentViewNavigation.vue'
import DocumentViewBreadCrumbList from '~/components/view/DocumentViewBreadCrumbList'
import { headlineMenuControllHook } from '~/hooks/view/headlinmenu/headlineMenuControllHook'
import DocumentViewHeadlineMenu from '~/components/view/DocumentViewHeadlineMenu.vue'

export default defineComponent({
  components: {
    DocumentViewBreadCrumbList,
    DocumentViewHeadlineMenu,
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
      createdDateTime,
      updatedDateTime,
      goHash
    } = useViewContent(props)

    const {
      headlineMenuParam,
      addClickListener,
      removeClickListener,
      closeHeadlineMenu
    } = headlineMenuControllHook(props)

    const viewer = ref(null) as Ref<HTMLElement | null> // ref=viewer相当
    useCollectHeadline(props, viewer, addClickListener, removeClickListener)

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

    return {
      viewer,
      pageId,
      pageTitle,
      pageData,
      createdDateTime,
      updatedDateTime,
      // headline menu
      headlineMenuParam,
      closeHeadlineMenu
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
.bread-crumb-block {
  margin-bottom: 20px;
}
.navigation {
  margin-top: 40px;
  margin-bottom: 80px;
}
</style>
