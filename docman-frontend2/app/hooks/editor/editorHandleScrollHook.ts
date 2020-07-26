import * as monacoEditor from 'monaco-editor'
import {
  computed,
  ComputedRef,
  nextTick,
  Ref,
  watchEffect
} from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
import SyncModeContainer from '~/containers/SyncModeContainer'
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
  const editorElementRef = computed(
    () => ((editor.value as IStandaloneCodeEditor) as unknown) as HTMLElement
  )

  const handleScroll = () => {
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

  useEventListener('scroll', handleScroll, false, editorElementRef.value)

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
    isScrollRecieved = true
    setTimeout(false)
    const topEnd = editorRef.value.getScrollHeight() - windowHeight.value
    nextTick(() => {
      editorRef.value.setScrollTop(topEnd * v)
    })
  }

  watchEffect(() => {
    setScrollTop(editorScrollValue.value)
  })
}
