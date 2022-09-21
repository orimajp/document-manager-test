<script setup lang="ts">
import draggable from 'vuedraggable'
import { INode } from '~/models/node/INode'
import {
  useDraggableTree
} from '~/composables/tree/use-draggable-tree'

interface Props {
  value?: Array<INode>
  list?: Array<INode>
  currentPageId: string
}

const props = defineProps<Props>()

interface Emits {
  (e: 'input', value: Array<INode>): void
}

const emit = defineEmits<Emits>()

const emitter = (value: Array<INode>) => emit('input', value)

const {
  moving,
  readValue,
  startMove,
  endMove,
  mouseDown,
  mouseUp,
  isCurrentPage,
  selectionPage
} = useDraggableTree(props)

</script>

<script lang="ts">
export default {
  name: "EditableTree",
}
</script>

<template>
  <draggable
    class="item-container"
    :list="list"
    :value="value"
    :group="{ name: 'treeNodes' }"
    animation="200"
    @input="emitter"
    @start="startMove"
    @end="endMove"
  >
    <div v-for="child in readValue" :key="child.pageId" class="item-group">
      <div
        class="item"
        :class="{
          'current-item': isCurrentPage(child.pageId),
          moving: moving,
          'select-item': selectionPage(child.pageId)
        }"
        :data-page-key="child.pageId"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
      >
        {{ child.pageTitle }}
      </div>
      <editable-tree
        :list="child.nodes"
        :current-page-id="currentPageId"
        class="item-sub"
      />
    </div>
  </draggable>
</template>

<style scoped>
.item-container {
  /*max-width: 20rem;*/
  /*width: 100%;*/
  right: 0;
  margin: 0;
}
.item-group {
}
.item {
  cursor: grab;
  /*padding: 1rem;*/
  padding: 5px 10px;
  border: solid darkgrey 1px;
  border-radius: 5px;
  background-color: #fefefe;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
.item.current-item {
  border: solid darkgrey 3px;
}
.item.select-item {
  font-weight: bold;
}
.item.moving {
  cursor: grabbing;
}
.item-sub {
  /*margin: 0 0 0 1rem;*/
  margin: 1px 0 1px 20px;
}
</style>
