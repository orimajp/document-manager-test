<script setup lang="ts">
import {
  TreeContextMenuParam,
} from '~/composables/view/contextmenu/use-tree-context-menu-controll'
import { useTreeContextRouting } from '~/composables/view/contextmenu/use-tree-context-menu-routing'
import { useTreeContextMenu } from '~/composables/view/contextmenu/use-tree-context-menu'

interface Props {
  treeContextMenuParam: TreeContextMenuParam
}

const props = defineProps<Props>()

interface Emits {
  (e: 'closeContextMenu'): void
}
const emit = defineEmits<Emits>()

const closeContextMenu =() => {
  emit('closeContextMenu')
}

const {
  showContextMenu,
  openPageId,
  openPageTitle,
  contextMenuX,
  contextMenuY,
  top
} = useTreeContextMenu(props, closeContextMenu)

const {
  openPage,
  copyUrl,
  copyPath,
  createChildPage,
  createNextPage
} = useTreeContextRouting(openPageId, openPageTitle)
</script>

<template>
  <v-menu
    v-model="showContextMenu"
    :position-x="contextMenuX"
    :position-y="contextMenuY"
    absolute
    offset-y
  >
    <v-list dense>
      <v-list-item class="menu-item" dense @click="openPage">
        <v-list-item-title> 新規ウィンドウで開く </v-list-item-title>
      </v-list-item>
      <v-list-item class="menu-item" dense @click="copyUrl">
        <v-list-item-title> URLをクリップボードにコピー </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item class="menu-item" dense @click="copyPath">
        <v-list-item-title>
          パスをMarkdown形式でクリップボードにコピー
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item class="menu-item" dense @click="createChildPage">
        <v-list-item-title> 子の先頭にページを追加 </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!top" class="menu-item" dense @click="createNextPage">
        <v-list-item-title> 次にページを追加 </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>
