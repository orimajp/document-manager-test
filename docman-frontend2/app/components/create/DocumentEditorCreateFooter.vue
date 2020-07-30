<template>
  <v-footer padless fixed>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelDocument">
        キャンセル
      </v-btn>
    </div>
    <div class="footer-button">
      <v-btn
        color="primary"
        block
        :disabled="!change"
        @click="registerDocumentPage"
      >
        保存
      </v-btn>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import EditStateContainer from '~/containers/EditStateContainer'

interface EditorCreateProp {
  documentEdit: boolean
}

export default defineComponent({
  props: {
    documentEdit: Boolean as PropType<boolean>
  },
  setup(props: EditorCreateProp, context: SetupContext) {
    const { change } = EditStateContainer.useContainer()

    const registerDocumentPage = () => {
      if (props.documentEdit) {
        context.emit('registerDocument')
        return
      }
      context.emit('registerPage')
    }

    const cancelDocument = () => {
      context.emit('cancelDocument')
    }

    return {
      change,
      registerDocumentPage,
      cancelDocument
    }
  }
})
</script>

<style scoped>
.footer-button {
  padding: 5px 5px 5px 0;
  min-width: 150px;
}
</style>
