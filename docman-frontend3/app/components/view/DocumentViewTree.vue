<script setup lang="ts">
import DocumentViewTree from '~/components/view/DocumentViewTree.vue'
import { NodeData } from '~/models/node/NodeData'
// import { TreeProps, useTree } from '~/composables/view/tree/use-tree'
import { useTree } from '~/composables/view/tree/use-tree'

interface Props {
  currentNode: NodeData
  pageIdArray: Array<string>
}

const props = defineProps<Props>()

interface Emits {
  (e: 'openContextMenu', pageId: string, pageTitle: string, ex: MouseEvent): void
}
const emit = defineEmits<Emits>()

const openContextMenu = (
  pageId: string,
  pageTitle: string,
  e: MouseEvent
) => {
//     context.emit('openContextMenu', pageId, pageTitle, e)
  emit('openContextMenu', pageId, pageTitle, e)
}

const {
  iconText,
  firstNode,
//  currentPageId,
  addPageIdArray,
  openPage,
//  openContextMenu,
  openTreeContextMenu
} = useTree(props, openContextMenu)
</script>

<template>
  <div>
    <li
      v-if="!firstNode"
      class="doc-list"
      :class="{ selected: currentNode.select }"
      @click="openPage"
      @contextmenu="openTreeContextMenu"
    >
      <v-icon class="collapse-icon" v-text="iconText" />
      <span>{{ currentNode.pageTitle }}</span>
    </li>
    <li
      v-if="currentNode.expand"
      class="collapse-list"
      :class="{ 'border-list': !firstNode }"
    >
      <ul class="doc-layer">
        <document-view-tree
          v-for="(child, index) in currentNode.nodes"
          :key="index"
          :page-id-array="addPageIdArray"
          :current-node="child"
          @openContextMenu="openContextMenu"
        />
      </ul>
    </li>
  </div>
</template>

<style scoped>
.doc-layer {
  padding-left: 0;
}
.collapse-list {
  margin-left: 13px;
  padding: 0;
}
.border-list {
  border-left: solid 1px grey;
}

li {
  list-style-type: none;
  line-height: 1;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 13px;
  word-wrap: break-word;
  text-indent: -1em;
  padding-left: 1em;
}
.doc-list {
  cursor: pointer;
  padding-top: 9px;
  padding-bottom: 9px;
  /*position: relative;*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.doc-list:hover {
  background-color: lightgrey;
  /*background-color: darkgrey;*/
  /*background-color: white;*/
  padding-left: 13px;
  color: black;
}
.page-link {
  color: inherit;
  text-decoration: none;
}
.collapse-icon {
  color: white;
  margin: -4px -4px -4px 0;
  font-size: 13px;
  width: 13px;
}
.selected {
  font-weight: bold;
  color: black;
  /*background-color: white;*/
  background-color: lightgrey;
}
.selected .collapse-icon {
  color: black;
}
</style>
