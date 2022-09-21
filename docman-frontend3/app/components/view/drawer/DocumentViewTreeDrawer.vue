<script setup lang="ts">
import DrawerContainer from '~/containers/drawer-container'
// @ts-ignore
import DocumentViewTreeContextMenu from '~/components/view/DocumentViewTreeContextMenu.vue'
import { useTreeContextControll } from '~/composables/view/contextmenu/use-tree-context-menu-controll'
import { useTreeDrawer } from '~/composables/view/treedrawer/use-tree-drawer'
// @ts-ignore
import DocumentViewTree from '~/components/view/DocumentViewTree.vue'
// @ts-ignore
import DocumentViewSearch from '~/components/view/DocumentViewSearch.vue'

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

const topContextMenu = (e: MouseEvent) => {
  openTopContextMenu(documentId.value, pageTitle.value, e)
}

const treeContextMenu = (pageId: string, pageTitle: string, e: MouseEvent) => {
  openTreeContextMenu(pageId, pageTitle, e)
}
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="permanent"
    :temporary="!permanent"
    app
    clipped
    color="secondary"
  >
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
