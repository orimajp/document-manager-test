<script setup lang="ts">
import {
//  EditorNavbarProps,
  useEditorNavbar
} from '~/composables/edit/use-editor-navbar'

interface Props {
  pageTitle: string
  documentEdit: boolean
  createMode: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'goTop'): void
  (e: 'updateTitle', newTitle: string): void
}

const emit = defineEmits<Emits>()


const goTop = () => {
//    context.emit('goTop')
  emit('goTop')
}

const updateTitle = (newTitle: string) => {
//    context.emit('updateTitle', newTitle)
  emit('updateTitle', newTitle)
}

const {
  titleField,
  editTarget,
  option,
  mode,
  editValue,
  dualValue,
  prevValue,
//  goTop,
//  updateTitle
} = useEditorNavbar(props)

</script>

<template>
  <v-app-bar appdark fixed dense dark class="primary">
    <v-btn icon @click="goTop">
      <v-icon>mdi-home</v-icon>
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
      <v-btn value="DARK" color="secondary" tabindex="-1">DARK</v-btn>
      <v-btn value="SYNC" color="secondary" tabindex="-1">SYNC</v-btn>
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
