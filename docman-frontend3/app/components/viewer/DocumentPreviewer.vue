<script setup lang="ts">
import { Ref, ref } from '@nuxtjs/composition-api'
import { useViewerHandleScroll } from '~/composables/viewer/use-viewer-handle-scroll'
import { PageData } from '~/models/page/PageData'
import { useViewContent } from '~/composables/view/use-view-content'
import { useViewerWindowSize } from '~/composables/viewer/use-viewer-window-size'
import DisplayModeContainer from '~/containers/display-mode-container'
// @ts-ignore
import DocumentPreviwerHeadlineMenu from '~/components/viewer/DocumentPreviewerHeadlineMenu.vue'
import { headlineMenuControll } from '~/composables/view/headlinemenu/use-headline-menu-controll'
import { useViewerCollectHeadline } from '~/composables/viewer/use-viewer-colletc-headline'

interface Props {
  pageContent: PageData
}

const props = defineProps<Props>()

const { pageTitle, pageData } = useViewContent(props)
const { displayMode, dualMode } = DisplayModeContainer.useContainer()
const { viewerWidthStlye } = useViewerWindowSize(displayMode)

const viewer = ref(null) as Ref<HTMLElement | null> // ref=viewer相当
useViewerHandleScroll(viewer)

const {
  headlineMenuParam,
  addClickListener,
  removeClickListener,
  closeHeadlineMenu
} = headlineMenuControll(props)

useViewerCollectHeadline(
  props,
  viewer,
  addClickListener,
  removeClickListener
)
</script>

<template>
  <v-main>
    <v-container fluid :class="{ 'editor-container-fluid': dualMode }">
      <div ref="viewer" class="edit-preview-style">
        <h1 class="document-title markdown-edit-mode">
          {{ pageTitle }}
        </h1>
        <div
          class="markdown-body markdown-edit-mode"
          :style="{ width: viewerWidthStlye }"
        >
          <div v-html="$md.render(pageData)" />
        </div>
      </div>
      <document-previwer-headline-menu
        :headline-menu-param="headlineMenuParam"
        @closeHeadlineMenu="closeHeadlineMenu"
      />
    </v-container>
  </v-main>
</template>

<style>
@import 'app/assets/css/markdown.css';

/* codeテキスト部のみ背景色がつく問題への対応 */
.theme--light.v-application code {
  background-color: initial;
}
</style>
