

<script setup lang="ts">
import {
  computed,
//  defineComponent,
  onMounted,
//  PropType,
  Ref,
  ref,
  nextTick,
//  SetupContext
} from '@nuxtjs/composition-api'
import MonacoEditor from 'vue-monaco'
import * as monacoEditor from 'monaco-editor'
import DisplayModeContainer from '~/containers/display-mode-container'
import { useEditorWindowSize } from '~/composables/editor/use-editor-window-size'
import { useEditorHandleScroll } from '~/composables/editor/use-editor-handle-scroll'
import { useEditorHandleWindowResize } from '~/composables/editor/use-editor-handle-window-resize'
import DarkModeContainer from '~/containers/dark-mode-container'
import { useEditorInsertAssetLink } from '~/composables/editor/use-editor-insert-asset-link'
// eslint-disable-next-line
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor

interface Props {
  markdownData: string
  editMode: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: 'updatePageData', newValue: string): void
}

const emit = defineEmits<Emits>()

const { displayMode } = DisplayModeContainer.useContainer()
const {
  windowHeight,
  windowWidth,
  editorHeightStyle,
  editorWidthStyle
} = useEditorWindowSize(displayMode)

const fontSize = 13

const { darkMode } = DarkModeContainer.useContainer()
const theme = computed(() => (darkMode.value ? 'vs-dark' : ''))

const editData = computed({
  get: () => props.markdownData,
  set: (newValue: string) => {
    // eslint-disable-next-line vue/custom-event-name-casing
//    context.emit('updatePageData', newValue)
    emit('updatePageData', newValue)
  }
})

const monaco = ref(null) as Ref<monacoEditor | null>
const onEditorWillMount = (monacoInstance: monacoEditor) => {
  monaco.value = monacoInstance
}

const markdownEditor = ref(null) as Ref<IStandaloneCodeEditor | null>
const editor = ref(null) as Ref<InstanceType<typeof MonacoEditor> | null> // ref=editor相当

const focus = () => {
  ;(markdownEditor.value as IStandaloneCodeEditor).focus()
}

onMounted(() => {
  nextTick(() => {
    markdownEditor.value = (editor.value as typeof MonacoEditor).getEditor()
//    console.log(markdownEditor.value)
//    console.log(editor.value.getEditor())
    // markdownEditor.value = editor.value.getEditor()
    if (props.editMode) {
      focus()
    }
  })
})

useEditorHandleScroll(markdownEditor, windowHeight)
useEditorHandleWindowResize(markdownEditor, windowHeight, windowWidth)
useEditorInsertAssetLink(markdownEditor)
</script>

<template>
  <MonacoEditor
    ref="editor"
    v-model="editData"
    :style="{ width: editorWidthStyle, height: editorHeightStyle }"
    :options="{
      scrollBeyondLastLine: false,
      occurrencesHighlight: false,
      wordWrap: 'on',
      fontSize: fontSize
    }"
    :theme="theme"
    language="markdown"
    class="mdeditor"
    @editorWillMount="onEditorWillMount"
  />
</template>
