<script setup lang="ts">
import { useRoute } from '@nuxtjs/composition-api'
// @ts-ignore
import DocumentTreeEditorNavbar from '~/components/tree/DocumentTreeEditorNavbar.vue'
import DraggableTree from '~/components/tree/DraggableTree.vue'
// @ts-ignore
import DocumentTreeEditorFooter from '~/components/tree/DocumentTreeEditorFooter.vue'
import { useTreeEditor } from '~/composables/tree/use-tree-editor'

const route = useRoute()
const pageId = route.value.params.key

const {
  treeNodes,
  pageTitle,
  fetchTreeData,
  registerTree,
  cancelTree,
  editAreaHeight
} = useTreeEditor()

fetchTreeData(pageId)

const registerTreeData = () => {
  registerTree(pageId)
}

const cancelTreeData = () => {
  cancelTree(pageId)
}
</script>

<template>
  <div>
    <document-tree-editor-navbar :page-title="pageTitle" />
    <v-main>
      <v-container>
        <div class="tree-edit-content">
          <v-card :height="editAreaHeight" class="tree-edit-area" outlined>
            <draggable-tree v-model="treeNodes" :current-page-id="pageId" />
          </v-card>
        </div>
      </v-container>
    </v-main>
    <document-tree-editor-footer
      @registerTree="registerTreeData"
      @cancelTree="cancelTreeData"
    />
  </div>
</template>

<style scoped>
.tree-edit-content {
  padding: 10px;
}
.tree-edit-area {
  width: 100%;
  overflow: scroll;
  padding: 20px;
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
