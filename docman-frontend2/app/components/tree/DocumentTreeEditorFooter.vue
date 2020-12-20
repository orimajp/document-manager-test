<template>
  <v-footer fixed padless>
    <v-spacer />
    <div class="footer-button">
      <v-btn block @click="cancelTree">キャンセル</v-btn>
    </div>
    <div class="footer-button">
      <v-btn color="primary" block @click="registerTree">保存</v-btn>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'

export default defineComponent({
  setup(_, context: SetupContext) {
    // eslint-disable-next-line vue/custom-event-name-casing
    const registerTree = () => context.emit('registerTree')
    // eslint-disable-next-line vue/custom-event-name-casing
    const cancelTree = () => context.emit('cancelTree')

    return {
      registerTree,
      cancelTree
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
