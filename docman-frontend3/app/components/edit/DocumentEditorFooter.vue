<script setup lang="ts">
import EditStateContainer from '~/containers/edit-state-container'

interface Emits {
  (e: 'updateDocument'): void
  (e: 'cancelDocument'): void
}
const emit = defineEmits<Emits>()

const { change } = EditStateContainer.useContainer()

const updateDocument = () => {
  emit('updateDocument')
}

const cancelDocument = () => {
  emit('cancelDocument')
}
</script>

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

<style scoped>
.footer-button {
  padding: 5px 5px 5px 0;
  min-width: 150px;
}
</style>
