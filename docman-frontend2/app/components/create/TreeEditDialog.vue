<template>
  <v-dialog v-model="showModal" persistent max-width="800">
    <div class="tree-edit-content">
      <v-card outlined :height="dialogAreaHeight">
        <v-card-title>
          メニュー階層変更
        </v-card-title>
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
import {
  computed,
  defineComponent,
  PropType,
  SetupContext,
  watchEffect
} from '@vue/composition-api'
import { TreeEditDialogControllMenu } from '~/hooks/create/treeEditDialogControllHook'
import { useTreeEditDialog } from '~/hooks/create/treeEditDialogHook'
import DraggableTree from '~/components/tree/DraggableTree.vue'

type Props = {
  treeEditDialogControllMenu: TreeEditDialogControllMenu
}

export default defineComponent({
  components: {
    DraggableTree
  },
  props: {
    treeEditDialogControllMenu: Object as PropType<TreeEditDialogControllMenu>
  },
  setup(props: Props, contest: SetupContext) {
    const showModal = computed<boolean>({
      get: () => props.treeEditDialogControllMenu.showModal,
      set: () => contest.emit('closeDialog')
    })
    const pageId = computed(() => props.treeEditDialogControllMenu.pageId)

    const {
      treeNodes,
      pageTitle,
      fetchTreeData,
      registerTree,
      cancelTree,
      editAreaHeightStyle,
      dialogAreaHeight
    } = useTreeEditDialog()

    watchEffect(() => {
      if (showModal.value) {
        fetchTreeData(pageId.value)
      }
    })

    const registerTreeData = () => {
      registerTree(pageId.value)
    }

    const cancelTreeData = () => {
      cancelTree(pageId.value)
    }

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
