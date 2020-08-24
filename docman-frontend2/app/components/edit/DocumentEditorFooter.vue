<template>
  <v-footer padless fixed>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelDocument">キャンセル</v-btn>
    </div>
    <div class="footer-button">
      <v-btn color="primary" block :disabled="!change" @click="updateDocument">
        保存
      </v-btn>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import EditStateContainer from '~/containers/EditStateContainer'

export default defineComponent({
  setup(_, context: SetupContext) {
    const { change } = EditStateContainer.useContainer()

    const updateDocument = () => {
      context.emit('updateDocument')
    }

    const cancelDocument = () => {
      context.emit('cancelDocument')
    }

    return {
      change,
      updateDocument,
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
