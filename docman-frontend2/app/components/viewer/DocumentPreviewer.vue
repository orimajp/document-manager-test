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

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from '@vue/composition-api'
import { useViewerHandleScroll } from '~/hooks/viewer/viewerHandleScrollHook'
import { PageData } from '~/models/page/PageData'
import { PageContentProp, useViewContent } from '~/hooks/view/viewContentHook'
import { useViewerWindowSize } from '~/hooks/viewer/viewerWindowSizeHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import DocumentPreviwerHeadlineMenu from '~/components/viewer/DocumentPreviewerHeadlineMenu'
import { headlineMenuControllHook } from '~/hooks/view/headlinmenu/headlineMenuControllHook'
import { useViewerCollectHeadline } from '~/hooks/viewer/viewerCollectHeadlineHook'

export default defineComponent({
  components: {
    DocumentPreviwerHeadlineMenu
  },
  props: {
    pageContent: Object as PropType<PageData>
  },
  setup(props: PageContentProp) {
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
    } = headlineMenuControllHook(props)

    useViewerCollectHeadline(
      props,
      viewer,
      addClickListener,
      removeClickListener
    )

    return {
      viewer,
      pageTitle,
      pageData,
      dualMode,
      viewerWidthStlye,
      // headline menu
      headlineMenuParam,
      closeHeadlineMenu
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
</style>
