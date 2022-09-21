<script setup lang="ts">
interface Emits {
  (e: 'registerTree'): void
  (e: 'cancelTree'): void
}

const emit = defineEmits<Emits>()

const registerTree = () => emit('registerTree')

const cancelTree = () => emit('cancelTree')
</script>

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

<style scoped>
.footer-button {
  padding: 5px 5px 5px 0;
  min-width: 150px;
}
</style>
