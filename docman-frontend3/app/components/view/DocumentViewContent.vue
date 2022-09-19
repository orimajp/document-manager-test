<script setup lang="ts">
import {
  computed,
//  defineComponent,
  nextTick,
  onMounted,
  onUnmounted,
//  PropType,
  Ref,
  ref
} from '@nuxtjs/composition-api'
import { PageData } from '~/models/page/PageData'
// import { PageContentProp, useViewContent } from '~/composables/view/use-view-content'
import { useViewContent } from '~/composables/view/use-view-content'
import { useCollectHeadline } from '~/composables/view/use-view-collect-headline'
import { useNavigate } from '~/composables/view/use-view-navigate'
import DocumentViewNavigation from '~/components/view/DocumentViewNavigation.vue'
import DocumentViewBreadCrumbList from '~/components/view/DocumentViewBreadCrumbList.vue'
import { headlineMenuControll } from '~/composables/view/headlinemenu/use-headline-menu-controll'
import DocumentViewHeadlineMenu from '~/components/view/DocumentViewHeadlineMenu.vue'
import { useViewIndexSearch } from '~/composables/view/use-view-index-search'
import { useViewContentHeighlight } from '~/composables/view/use-view-content-heighlight'

interface Props {
  pageContent: PageData
}

const props = defineProps<Props>()

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
} = headlineMenuControll(props)

const viewer = ref(null) as Ref<HTMLElement | null> // ref=viewer相当
useCollectHeadline(props, viewer, addClickListener, removeClickListener)

const { searchKeyword } = useViewIndexSearch()
const queries = computed(() =>
  searchKeyword.value ? [searchKeyword.value] : []
)

const { addNavigateListener, removeNavigateListener } = useNavigate()

// 本文に対する検索文字強調表示
const { updateContentHeighlight } = useViewContentHeighlight(
  viewer,
  searchKeyword,
  addNavigateListener,
  removeNavigateListener
)

// FIXME addNavigateListener()の実行が空振ってしまうので無理矢理タイマで待ち合わせる
onMounted(() => {
  window.setTimeout(() => {
    nextTick(() => {
      addNavigateListener(viewer)
      updateContentHeighlight()
      goHash()
    })
  }, 200)
})

onUnmounted(() => {
  removeNavigateListener()
})






</script>

<template>
  <v-main>
    <v-container fluid>
      <document-view-bread-crumb-list class="bread-crumb-block" />
      <div>
        <h1 class="document-title">
          <text-highlight :queries="queries">
            {{ pageTitle }}
          </text-highlight>
        </h1>
        <div class="markdown-content">
          <div class="date-data">作成 {{ createdDateTime }}</div>
          <div class="date-data">更新 {{ updatedDateTime }}</div>
        </div>
        <div ref="viewer" class="markdown-body">
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

<style>
@import 'app/assets/css/markdown.css';
.bread-crumb-block {
  margin-bottom: 20px;
}
.navigation {
  margin-top: 40px;
  margin-bottom: 80px;
}
.text-heighlight {
  background: #fc0;
  border-radius: 3px;
}
</style>
