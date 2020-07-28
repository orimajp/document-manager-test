<template>
  <v-app-bar appdark fixed dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>
        mdi-home
      </v-icon>
    </v-btn>
    <v-chip>
      {{ editTarget }}
    </v-chip>
    <v-text-field
      ref="titleField"
      outlined
      light
      dense
      filled
      flat
      hide-details
      placeholder="タイトル"
      class="header-input"
      :value="pageTitle"
      @input="updateTitle"
    />
    <v-btn-toggle v-model="option" dense multiple class="option-button-group">
      <v-btn value="DARK" color="secondary" tabindex="-1">
        DARK
      </v-btn>
      <v-btn value="SYNC" color="secondary" tabindex="-1">
        SYNC
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle v-model="mode" dense>
      <v-btn :value="editValue" color="secondary" tabindex="-1">
        <span>EDIT</span>
      </v-btn>
      <v-btn :value="dualValue" color="secondary" tabindex="-1">
        <span>DUAL</span>
      </v-btn>
      <v-btn :value="prevValue" color="secondary" tabindex="-1">
        <span>PREV</span>
      </v-btn>
    </v-btn-toggle>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, PropType, SetupContext } from '@vue/composition-api'
import {
  EditorNavbarProps,
  useEditorNavbar
} from '~/hooks/edit/editorNavbarHook'

export default defineComponent({
  props: {
    pageTitle: String as PropType<string>,
    documentEdit: Boolean as PropType<boolean>,
    createMode: Boolean as PropType<boolean>
  },
  setup(props: EditorNavbarProps, context: SetupContext) {
    const {
      titleField,
      editTarget,
      option,
      mode,
      editValue,
      dualValue,
      prevValue,
      goTop,
      updateTitle
    } = useEditorNavbar(props, context)

    return {
      titleField,
      editTarget,
      option,
      mode,
      editValue,
      dualValue,
      prevValue,
      goTop,
      updateTitle
    }
  }
})
</script>

<style scoped>
.option-button-group {
  margin-right: 8px;
}
.header-input {
  margin-top: 0;
  margin-right: 10px;
  margin-left: 10px;
  background-color: #f5f5f5;
}
</style>
