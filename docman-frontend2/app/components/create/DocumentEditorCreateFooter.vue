<template>
  <v-footer padless fixed>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelDocument">キャンセル</v-btn>
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
import { defineComponent, SetupContext } from '@vue/composition-api'
import EditStateContainer from '~/containers/EditStateContainer'

export default defineComponent({
  setup(_, context: SetupContext) {
    const { change } = EditStateContainer.useContainer()

    const registerDocumentPage = () => {
      // eslint-disable-next-line vue/custom-event-name-casing
      context.emit('registerDocumentPage')
    }

    const cancelDocument = () => {
      // eslint-disable-next-line vue/custom-event-name-casing
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
