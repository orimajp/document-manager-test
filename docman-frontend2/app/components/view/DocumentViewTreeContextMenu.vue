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
import { computed, defineComponent, PropType, ref } from '@vue/composition-api'
import { TreeContextMenuParam } from '~/hooks/view/contextmenu/treeContextMenuControllHook'
import { useTreeContextRouting } from '~/hooks/view/contextmenu/treeContextMenuRoutingHook'

type Props = {
  treeContextMenuParam: TreeContextMenuParam
}

export default defineComponent({
  props: {
    treeContextMenuParam: Object as PropType<TreeContextMenuParam>
  },
  setup(props: Props, context) {
    const showContextMenu = computed<boolean>({
      get: () => props.treeContextMenuParam.showContextMenu,
      set: () => context.emit('closeContextMenu')
    })

    const openPage = () => {
      const url = `/document/view/${props.treeContextMenuParam.openPageId}`
      window.open(url, '_blank')
    }

    const { createChildPage, createNextPage } = useTreeContextRouting(
      ref(props.treeContextMenuParam.openPageId)
    )

    return {
      showContextMenu,
      contextMenuX: props.treeContextMenuParam.contextMenuX,
      contextMenuY: props.treeContextMenuParam.contextMenuY,
      top: props.treeContextMenuParam.top,
      openPage,
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
