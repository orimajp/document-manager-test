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

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import draggable from 'vuedraggable'
import { INode } from '~/models/node/INode'
import {
  DraggableTreeProps,
  useDraggableTree
} from '~/hooks/tree/draggableTreeHook'

export default defineComponent({
  name: 'EditableTree',
  components: {
    draggable
  },
  props: {
    value: Array as PropType<Array<INode>>,
    list: Array as PropType<Array<INode>>,
    currentPageId: String as PropType<string>
  },
  setup(props: DraggableTreeProps, context: SetupContext) {
    const {
      moving,
      selectedPageId,
      readValue,
      startMove,
      endMove,
      mouseDown,
      mouseUp,
      emitter,
      isCurrentPage,
      selectionPage
    } = useDraggableTree(props, context)

    return {
      moving,
      selectedPageId,
      readValue,
      startMove,
      endMove,
      mouseDown,
      mouseUp,
      emitter,
      isCurrentPage,
      selectionPage
    }
  }
})
</script>

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
