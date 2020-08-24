<template>
  <v-dialog v-model="modal" persistent width="500">
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

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import FileUploadContainer from '~/containers/FileUploadContainer'

export default defineComponent({
  setup() {
    const { errroModal, errorMessage } = FileUploadContainer.useContainer()

    const close = () => {
      errroModal.value = false
    }

    return {
      modal: errroModal,
      errorMessage,
      close
    }
  }
})
</script>

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
