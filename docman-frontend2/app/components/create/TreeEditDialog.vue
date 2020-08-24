<template>
  <v-dialog v-model="showModal" persistent max-width="800">
    <div class="tree-edit-content">
      <v-card outlined :height="dialogAreaHeight">
        <v-card-title>メニュー階層変更</v-card-title>
        <v-card-text :style="{ height: editAreaHeightStyle }">
          <div class="tree-edit-area" :style="{ height: editAreaHeightStyle }">
            <draggable-tree v-model="treeNodes" :current-page-id="pageId" />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-f1" text @click="cancelTreeData">
            変更しない
          </v-btn>
          <v-btn color="blue darken-f1" text @click="registerTreeData">
            変更を保存
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import {
  TreeEditDialogControllMenu,
  TreeEditDialogControllProps
} from '~/hooks/create/treeEditDialogControllHook'
import { useTreeEditDialog } from '~/hooks/create/treeEditDialogHook'
import DraggableTree from '~/components/tree/DraggableTree.vue'

export default defineComponent({
  components: {
    DraggableTree
  },
  props: {
    treeEditDialogControllMenu: Object as PropType<TreeEditDialogControllMenu>
  },
  setup(props: TreeEditDialogControllProps, contest: SetupContext) {
    const {
      showModal,
      pageId,
      treeNodes,
      pageTitle,
      registerTreeData,
      cancelTreeData,
      editAreaHeightStyle,
      dialogAreaHeight
    } = useTreeEditDialog(props, contest)

    return {
      showModal,
      pageId,
      treeNodes,
      pageTitle,
      registerTreeData,
      cancelTreeData,
      editAreaHeightStyle,
      dialogAreaHeight
    }
  }
})
</script>
<style scoped>
.tree-edit-content {
  /*padding: 10px;*/
}
.tree-edit-area {
  width: 100%;
  overflow: scroll;
  padding: 20px;
  border: solid 1px lightgray;
  border-radius: 5px;
  background: repeating-linear-gradient(
    90deg,
    #eeeeee 0px,
    #eeeeee 20px,
    #e0e0e0 20px,
    #e0e0e0 40px
  );
}
</style>
