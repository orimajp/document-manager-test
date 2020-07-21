<template>
  <v-main>
    <v-container fluid :class="{ 'editor-container-fluid': dualMode }">
      <div id="markdown-viewer" class="edit-preview-style">
        <h1 class="document-title markdown-edit-mode">
          {{ pageTitle }}
        </h1>
        <div
          class="markdown-body markdown-edit-mode"
          :style="{ width: viewerWidthStlye }"
        >
          <div>{{ pageData }}</div>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts">
// import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import { defineComponent, PropType } from '@vue/composition-api'
import { useViewerScrollHandle } from '~/hooks/viewer/viewerHandleScrollHook'
import { PageData } from '~/models/page/PageData'
import { PageContentProp, useViewContent } from '~/hooks/view/viewContentHook'
import { useViewerWindowSize } from '~/hooks/viewer/viewerWindowSizeHook'
import DisplayModeContainer from '~/containers/DisplayModeContainer'

export default defineComponent({
  props: {
    pageContent: Object as PropType<PageData>
  },
  // setup(props: PageContentProp, context: SetupContext) {
  setup(props: PageContentProp) {
    const { pageTitle, pageData } = useViewContent(props)
    const { displayMode, dualMode } = DisplayModeContainer.useContainer()
    const { viewerWidthStlye } = useViewerWindowSize(displayMode)

    useViewerScrollHandle('markdown-viewer')

    return {
      pageTitle,
      pageData,
      dualMode,
      // viewerWidth,
      viewerWidthStlye
    }
  }
})
</script>

<style>
@import 'app/assets/css/markdown.css';
</style>
