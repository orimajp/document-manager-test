<script setup lang="ts">
import {
  TreeEditDialogControllMenu,
//  TreeEditDialogControllProps
} from '~/composables/create/use-tree-edit-daialog-controll'
import { useTreeEditDialog } from '~/composables/create/use-tree-edit-dialog'
import DraggableTree from '~/components/tree/DraggableTree.vue'

interface Props {
  treeEditDialogControllMenu: TreeEditDialogControllMenu
}

const props = defineProps<Props>()

interface Emits {
  (e: 'closeDialog'): void
}
const emit = defineEmits<Emits>()

const closeDialog = () => {
  emit('closeDialog')
}

const {
  showModal,
  pageId,
  treeNodes,
//  pageTitle,
  registerTreeData,
  cancelTreeData,
  editAreaHeightStyle,
  dialogAreaHeight
} = useTreeEditDialog(props, closeDialog)
</script>

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
