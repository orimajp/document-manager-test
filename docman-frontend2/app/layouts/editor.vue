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

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
// import HeadlineContanier from '~/containers/HeadlineContanier'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
import DarkModeContainer from '~/containers/DarkModeContainer'
import SyncModeContainer from '~/containers/SyncModeContainer'
import EditStateContainer from '~/containers/EditStateContainer'
import FileUploadContainer from '~/containers/FileUploadContainer'
import FileDraggable from '~/components/upload/FileDraggable'
import FileUploadDialog from '~/components/upload/FileUploadDialog'
import AssetLinkContainer from '~/containers/AssetLinkContainer'
import FileUploadErrorDialog from '~/components/upload/FileUploadErrorDialog.vue'
import SnackbarComboContainer from '~/containers/SnackbarComboContainer'
import SnackbarCombo from '~/components/SnackbarCombo.vue'

export default defineComponent({
  components: {
    SnackbarCombo,
    FileDraggable,
    FileUploadDialog,
    FileUploadErrorDialog
  },
  setup() {
    // HeadlineContanier.provide()
    DisplayModeContainer.provide()
    EditScrollHandleContainer.provide()
    DarkModeContainer.provide()
    SyncModeContainer.provide()
    EditStateContainer.provide()
    FileUploadContainer.provide()
    AssetLinkContainer.provide()
    SnackbarComboContainer.provide()
  }
})
</script>
