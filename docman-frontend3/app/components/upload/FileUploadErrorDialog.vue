<script setup lang="ts">
import FileUploadContainer from '~/containers/file-upload-container'

const { errroModal, errorMessage } = FileUploadContainer.useContainer()

const close = () => {
  errroModal.value = false
}
</script>

<template>
  <v-dialog v-model="errroModal" persistent width="500">
    <v-card>
      <v-card-title class="headline">アップロードエラー</v-card-title>
      <v-card-text>
        <div class="error-message-area">
          <div class="error-message-text">
            {{ errorMessage }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" text @click="close">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.error-message-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message-text {
  color: red;
  font-size: 150%;
}
</style>
