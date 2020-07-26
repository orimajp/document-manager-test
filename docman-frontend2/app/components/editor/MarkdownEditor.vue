<template>
  <monaco-editor
    ref="editor"
    v-model="editData.value"
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
  // PropType,
  Ref,
  ref,
  SetupContext
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
  /*
  props: {
    // markdownData: Object as PropType<string>,
    // editMode: Object as PropType<boolean>
    markdownData: {
      type: String
    },
    editMode: {
      type: Boolean
    }
  },
   */
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
    const theme = computed(() => (darkMode ? 'vs-dark' : ''))

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
      ;(markdownEditor as IStandaloneCodeEditor).layout()
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
