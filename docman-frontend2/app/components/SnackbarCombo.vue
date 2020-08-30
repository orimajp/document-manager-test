<template>
  <div>
    <v-snackbar v-model="infoDialog" top :timeout="timeout" color="info">
      {{ infoMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="infoDialog.value = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="warningDialog" top :timeout="timeout" color="warining">
      {{ warningMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="warningDialog.value = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="alertDialog" top :timeout="timeout" color="alert">
      {{ alertMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="alertDialog.value = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import SnackbarComboContainer from '~/containers/SnackbarComboContainer'

export default defineComponent({
  setup() {
    const {
      infoMessage,
      warningMessage,
      alertMessage,
      infoDialog,
      warningDialog,
      alertDialog
    } = SnackbarComboContainer.useContainer()

    const timeout = 1500

    return {
      infoMessage,
      warningMessage,
      alertMessage,
      infoDialog,
      warningDialog,
      alertDialog,
      timeout
    }
  }
})
</script>

<style scoped></style>
