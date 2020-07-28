<template>
  <monaco-editor
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

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  Ref,
  ref,
  SetupContext,
  watchEffect
} from '@vue/composition-api'
import MonacoEditor from 'vue-monaco'
import * as monacoEditor from 'monaco-editor'
import DisplayModeContainer from '~/containers/DisplayModeContainer'
import { useEditorWindowSize } from '~/hooks/editor/editorWindowSizeHook'
import { useEditorHandleScroll } from '~/hooks/editor/editorHandleScrollHook'
import { useEditorHandleWindowResize } from '~/hooks/editor/editorHandleWindowResizeHook'
import DarkModeContainer from '~/containers/DarkModeContainer'
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor

export interface EditorProps {
  markdownData: string
  editMode: boolean
}

export default defineComponent({
  components: {
    MonacoEditor
  },
  props: {
    markdownData: String as PropType<string>,
    editMode: Boolean as PropType<boolean>
  },
  setup(props: EditorProps, context: SetupContext) {
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
        context.emit('updatePageData', newValue)
      }
    })

    const monaco = ref(null) as Ref<monacoEditor | null>
    const onEditorWillMount = (monacoInstance) => {
      monaco.value = monacoInstance
    }

    const markdownEditor = ref(null) as Ref<IStandaloneCodeEditor | null>
    const editor = ref(null) as Ref<InstanceType<typeof MonacoEditor> | null> // ref=editor相当

    const focus = () => {
      ;(markdownEditor.value as IStandaloneCodeEditor).focus()
    }

    onMounted(() => {
      markdownEditor.value = (editor.value as typeof MonacoEditor).getEditor()
      // markdownEditor.value = editor.value.getEditor()
      if (props.editMode) {
        focus()
      }
    })

    useEditorHandleScroll(markdownEditor, windowHeight)
    useEditorHandleWindowResize(markdownEditor, windowHeight, windowWidth)

    watchEffect(() => console.log(`windowHeight=${windowHeight.value}`))
    watchEffect(() => console.log(`windowWidth=${windowWidth.value}`))
    watchEffect(() =>
      console.log(`editorHeightStyle=${editorHeightStyle.value}`)
    )
    watchEffect(() => console.log(`editorWidthStyle=${editorWidthStyle.value}`))

    return {
      windowHeight,
      windowWidth,
      editorHeightStyle,
      editorWidthStyle,
      fontSize,
      editor,
      editData,
      theme,
      onEditorWillMount
    }
  }
})
</script>

<style scoped>
.mdeditor {
  /*margin-left: -12px;*/
}
</style>
