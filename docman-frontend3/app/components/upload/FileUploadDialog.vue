<script setup lang="ts">
import { fileUploadDialogControll } from '~/composables/upload/use-file-upload-dialog-controll'

const {
  dialogHeight,
  modal,
  inArea,
  dragover,
  dragleave,
  drop,
  cancelDragLeave,
  inAreaDragOver,
  inAreaDragLeave
} = fileUploadDialogControll()
</script>

<template>
  <v-dialog
    v-model="modal"
    fullscreen
    transition="fade-transition"
    style="margin-top: 40px"
    @dragleave="cancelDragLeave"
    @drop="dragleave"
  >
    <v-card
      color="grey lighten-4"
      @dragleave="cancelDragLeave"
      @drop="dragleave"
    >
      <v-card-title @dragleave="dragleave" @drop="dragleave" />
      <v-card-text @dragleave="dragleave" @dragover="dragover">
        <div
          class="drag-area"
          :style="{ height: dialogHeight + 'px' }"
          @dragleave="cancelDragLeave"
        >
          <div
            class="drag-ara-text"
            :class="{ 'in-area': inArea }"
            @dragover="inAreaDragOver"
            @drop="drop"
            @dragleave="inAreaDragLeave"
          >
            <p
              @dragover="inAreaDragOver"
              @drop="drop"
              @dragleave="cancelDragLeave"
            >
              ファイルをドロップ
            </p>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* https://qiita.com/super-mana-chan/items/0d35a0b9ac1bf97593c8 */
.drag-area {
  display: flex;
  justify-content: center;
  align-items: center;
}
.drag-ara-text {
  background-color: #e0e0e0;
  font-size: 200%;
  padding: 150px;
  border: solid #e0e0e0;
  border-radius: 20px;
}
.in-area {
  background-color: #bdbdbd;
  font-weight: bold;
  border: solid #bdbdbd;
}
</style>
