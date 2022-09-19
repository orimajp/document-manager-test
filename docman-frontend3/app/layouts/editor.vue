
<script setup lang="ts">
// import DisplayModeContainer from '~/containers/DisplayModeContainer'
// import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
// import DarkModeContainer from '~/containers/DarkModeContainer'
// import SyncModeContainer from '~/containers/SyncModeContainer'
// import EditStateContainer from '~/containers/EditStateContainer'
// import FileUploadContainer from '~/containers/FileUploadContainer'
import FileDraggable from '~/components/upload/FileDraggable.vue'
import FileUploadDialog from '~/components/upload/FileUploadDialog.vue'
// import AssetLinkContainer from '~/containers/AssetLinkContainer'
import FileUploadErrorDialog from '~/components/upload/FileUploadErrorDialog.vue'
// import SnackbarComboContainer from '~/containers/SnackbarComboContainer'
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
