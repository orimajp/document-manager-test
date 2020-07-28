import {
  nextTick,
  onMounted,
  onUnmounted,
  Ref,
  watchEffect
} from '@vue/composition-api'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'
import SyncModeContainer from '~/containers/SyncModeContainer'

export const useViewerHandleScroll = (viewer: Ref<HTMLElement | null>) => {
  const {
    viewerScrollValue,
    updateEditorScrollValue
  } = EditScrollHandleContainer.useContainer()
  const { syncMode } = SyncModeContainer.useContainer()

  let timeoutId: null | number = null
  let isScrollRecieved = false

  const handleScroll = (e: Event) => {
    if (isScrollRecieved) {
      return
    }
    if (!syncMode.value) {
      return
    }
    const el = e.target as Element
    if (el && el.clientHeight && el.scrollHeight) {
      const topEnd = el.scrollHeight - el.clientHeight
      if (topEnd > 0) {
        nextTick(() => {
          updateEditorScrollValue(el.scrollTop / topEnd)
        })
      }
    }
  }

  onMounted(() => {
    viewer.value?.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    viewer.value?.removeEventListener('scroll', handleScroll)
  })

  const setScrollTop = (v: number) => {
    if (viewer.value === null) {
      console.log('setScrollTop(): viewer.value is null.')
      return
    }
    isScrollRecieved = true
    setTimeout(false)
    const topEnd =
      (viewer.value as HTMLElement).scrollHeight -
      (viewer.value as HTMLElement).clientHeight
    nextTick(() => {
      ;(viewer.value as HTMLElement).scrollTop = topEnd * v
    })
  }

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

  watchEffect(() => {
    setScrollTop(viewerScrollValue.value)
  })
}
