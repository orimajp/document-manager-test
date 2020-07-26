import * as monacoEditor from 'monaco-editor'
import {
  computed,
  ComputedRef,
  nextTick,
  Ref,
  watch
} from '@vue/composition-api'
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor

export const useEditorHandleWindowResize = (
  editor: Ref<IStandaloneCodeEditor | null>,
  windowHeight: ComputedRef<number>,
  windowWidth: ComputedRef<number>
) => {
  const editorRef = computed(() => editor.value as IStandaloneCodeEditor)

  const resize = () => {
    nextTick(() => {
      editorRef.value.layout()
    })
  }

  // ★分割→プレビューへの遷移でハングする問題への対策
  watch(
    () => windowHeight.value,
    () => {
      if (windowWidth.value === 0) {
        return
      }
      resize()
    }
  )

  // ★分割→プレビューへの遷移でハングする問題への対策
  watch(
    () => windowWidth.value,
    () => {
      if (windowWidth.value === 0) {
        return
      }
      resize()
    }
  )
}
