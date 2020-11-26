import * as monacoEditor from 'monaco-editor'
import {
  computed,
  ComputedRef,
  nextTick,
  onMounted,
  Ref,
  watch
} from '@vue/composition-api'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
import SyncModeContainer from '~/containers/SyncModeContainer'
// eslint-disable-next-line no-undef
import IStandaloneCodeEditor = monacoEditor.editor.IStandaloneCodeEditor

export const useEditorHandleScroll = (
  editor: Ref<IStandaloneCodeEditor | null>,
  windowHeight: ComputedRef<number>
) => {
  const {
    editorScrollValue,
    updateViewerScrollValue
  } = EditScrollHandleContainer.useContainer()
  const { syncMode } = SyncModeContainer.useContainer()

  let timeoutId: null | number = null
  let isScrollRecieved = false

  const editorRef = computed(() => editor.value as IStandaloneCodeEditor)

  const handleScroll = () => {
    if (editorRef.value === null) {
      console.log('handleScroll(): editorRef.value is null.')
      return
    }
    if (isScrollRecieved) {
      return
    }
    if (!syncMode.value) {
      return
    }
    const scrollTop = editorRef.value.getScrollTop()
    const topEnd = editorRef.value.getScrollHeight() - windowHeight.value
    if (topEnd > 0) {
      nextTick(() => {
        updateViewerScrollValue(scrollTop / topEnd)
      })
    }
  }

  onMounted(() => {
    editorRef.value.onDidScrollChange(handleScroll)
  })

  const setTimeout = (clearOnly: boolean) => {
    // clearOnly不要では？
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      timeoutId = null
    }
    if (!clearOnly) {
      timeoutId = window.setTimeout(() => {
        isScrollRecieved = false
        timeoutId = null
      }, 200)
    }
  }

  const setScrollTop = (v: number) => {
    if (editorRef.value === null) {
      console.log('setScrollTop(): handleScroll(): editorRef.value is null.')
      return
    }
    isScrollRecieved = true
    setTimeout(false)
    const topEnd = editorRef.value.getScrollHeight() - windowHeight.value
    nextTick(() => {
      editorRef.value.setScrollTop(topEnd * v)
    })
  }

  watch(
    () => editorScrollValue.value,
    (newVal, oldVal) => {
      if (newVal !== oldVal) {
        setScrollTop(newVal)
      }
    }
  )
}
