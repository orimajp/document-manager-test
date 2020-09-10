<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="permanent"
    :temporary="!permanent"
    app
    clipped
    color="secondary"
  >
    <div class="pinned-area">
      <v-checkbox v-model="permanent" label="Pinned" dark />
    </div>
    <div>
      <document-view-search :page-id="pageId" />
    </div>
    <div class="link-area">
      <div
        class="document-top-link"
        :class="{ selected: documentSelected }"
        @click="goDocumentTop"
        @contextmenu="topContextMenu"
        v-text="pageTitle"
      />
      <ul class="tree-area">
        <document-view-tree
          :page-id-array="pageIdArray"
          :current-node="currentNode"
          @openContextMenu="treeContextMenu"
        />
      </ul>
    </div>
    <document-view-tree-context-menu
      :tree-context-menu-param="contextMenuParam"
      @closeContextMenu="closeContextMenu"
    />
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DrawerContainer from '~/containers/DrawerContainer'
import DocumentViewTreeContextMenu from '~/components/view/DocumentViewTreeContextMenu'
import { useTreeContextControll } from '~/hooks/view/contextmenu/treeContextMenuControllHook'
import { useTreeDrawer } from '~/hooks/view/treedrawer/treeDrawerHook'
import DocumentViewTree from '~/components/view/DocumentViewTree.vue'
import DocumentViewSearch from '~/components/view/DocumentViewSearch.vue'

export default defineComponent({
  components: {
    DocumentViewSearch,
    DocumentViewTree,
    DocumentViewTreeContextMenu
  },
  setup() {
    const { drawer, permanent } = DrawerContainer.useContainer()

    const {
      documentId,
      pageId,
      currentNode,
      pageIdArray,
      documentSelected,
      pageTitle,
      goDocumentTop
    } = useTreeDrawer()

    const {
      openTopContextMenu,
      openTreeContextMenu,
      closeContextMenu,
      contextMenuParam
    } = useTreeContextControll()

    const topContextMenu = (e) => {
      openTopContextMenu(documentId.value, pageTitle.value, e)
    }

    const treeContextMenu = (pageId, pageTitle, e) => {
      openTreeContextMenu(pageId, pageTitle, e)
    }

    return {
      // リンク/ツリー制御
      goDocumentTop,
      documentId,
      currentNode,
      pageIdArray,
      documentSelected,
      pageTitle,
      // コンテキストメニュー
      topContextMenu,
      treeContextMenu,
      closeContextMenu,
      contextMenuParam,
      // ドロワ制御
      drawer,
      permanent,
      pageId
    }
  }
})
</script>

<style scoped>
.pinned-area {
  color: white;
  padding-left: 10px;
}
.link-area {
  padding: 10px 0 10px 0;
  color: white;
}
.document-top-link {
  /*padding: 0 0 0 10px;*/
  padding: 5px 0 5px 10px;
  margin-bottom: 5px;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.document-top-link:hover {
  background-color: lightgray;
  color: black;
}
.tree-area {
  margin-left: -13px;
  padding-left: 0;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
</style>
