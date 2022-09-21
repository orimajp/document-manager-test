
<script setup lang="ts">
// @ts-ignore
import FileDraggable from '~/components/upload/FileDraggable.vue'
// @ts-ignore
import FileUploadDialog from '~/components/upload/FileUploadDialog.vue'
// @ts-ignore
import FileUploadErrorDialog from '~/components/upload/FileUploadErrorDialog.vue'
// @ts-ignore
import SnackbarCombo from '~/components/SnackbarCombo.vue'
import DisplayModeContainer from '~/containers/display-mode-container'
import EditScrollHandleContainer from '~/containers/edit-scroll-handler-container'
import DarkModeContainer from '~/containers/dark-mode-container'
import SyncModeContainer from '~/containers/sync-mode-container'
import EditStateContainer from '~/containers/edit-state-container'
import FileUploadContainer from '~/containers/file-upload-container'
import AssetLinkContainer from '~/containers/asset-link-container'
import SnackbarComboContainer from '~/containers/snackbar-container'

DisplayModeContainer.provide()
EditScrollHandleContainer.provide()
DarkModeContainer.provide()
SyncModeContainer.provide()
EditStateContainer.provide()
FileUploadContainer.provide()
AssetLinkContainer.provide()
SnackbarComboContainer.provide()
</script>

<script lang="ts">
export default {
  // eslint-disable-next-line
  name: "editor",
}
</script>

<template>
  <v-app>
    <snackbar-combo />
    <file-draggable>
      <nuxt />
    </file-draggable>
    <file-upload-dialog />
    <file-upload-error-dialog />
  </v-app>
</template>
