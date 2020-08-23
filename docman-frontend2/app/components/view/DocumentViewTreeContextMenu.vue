<template>
  <v-menu
    v-model="showContextMenu"
    :position-x="contextMenuX"
    :position-y="contextMenuY"
    absolute
    offset-y
  >
    <v-list>
      <v-list-item class="menu-item">
        <v-list-item-title @click="openPage">
          新規ウィンドウで開く
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item class="menu-item">
        <v-list-item-title @click="copyPath">
          パスをクリップボードにコピー
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <v-list-item class="menu-item">
        <v-list-item-title @click="createChildPage">
          子の先頭にページを追加
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!top" class="menu-item">
        <v-list-item-title @click="createNextPage">
          次にページを追加
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import {
  TreeContextMenuParam,
  TreeContextMenuProps
} from '~/hooks/view/contextmenu/treeContextMenuControllHook'
import { useTreeContextRouting } from '~/hooks/view/contextmenu/treeContextMenuRoutingHook'
import { useTreeContextMenu } from '~/hooks/view/contextmenu/treeContextMenuHook'

export default defineComponent({
  props: {
    treeContextMenuParam: Object as PropType<TreeContextMenuParam>
  },
  setup(props: TreeContextMenuProps, context: SetupContext) {
    const {
      showContextMenu,
      openPageId,
      contextMenuX,
      contextMenuY,
      top
    } = useTreeContextMenu(props, context)

    const {
      openPage,
      copyPath,
      createChildPage,
      createNextPage
    } = useTreeContextRouting(openPageId)

    return {
      showContextMenu,
      contextMenuX,
      contextMenuY,
      top,
      openPage,
      copyPath,
      createChildPage,
      createNextPage
    }
  }
})
</script>

<style scoped>
.menu-item {
  cursor: pointer;
  user-select: none;
}
.menu-item:hover {
  background-color: #fafafa;
}
</style>
