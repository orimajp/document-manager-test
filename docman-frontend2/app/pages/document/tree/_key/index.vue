<template>
  <div>
    <document-tree-editor-navbar :page-title="pageTitle" />
    <v-main>
      <v-container>
        <div class="tree-edit-content">
          <v-card :height="editAreaHeight" class="tree-edit-area" outlined>
            <draggable-tree
              v-model="treeNodes"
              :current-page-id="currentPageId"
            />
          </v-card>
        </div>
      </v-container>
    </v-main>
    <document-tree-editor-footer
      @registerTree="registerTree"
      @cancelTree="cancelTree"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DocumentTreeEditorNavbar from '~/components/tree/DocumentTreeEditorNavbar.vue'
import DraggableTree from '~/components/tree/DraggableTree.vue'
import DocumentTreeEditorFooter from '~/components/tree/DocumentTreeEditorFooter.vue'
import { useTreeEditor } from '~/hooks/tree/treeEditorHook'

export default defineComponent({
  components: {
    DocumentTreeEditorNavbar,
    DraggableTree,
    DocumentTreeEditorFooter
  },
  setup() {
    const {
      treeNodes,
      pageTitle,
      currentPageId,
      registerTree,
      cancelTree,
      editAreaHeight
    } = useTreeEditor()

    return {
      treeNodes,
      pageTitle,
      currentPageId,
      registerTree,
      cancelTree,
      editAreaHeight
    }
  }
})
</script>

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
