import {
  nextTick,
  // onMounted,
  // onUnmounted,
  Ref,
  watchEffect
} from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'
import EditScrollHandleContainer from '~/containers/EditScrollHandleContainer'

export const useViewerScrollHandle = (
  // context: SetupContext,
  // targetId: string
  viewer: Ref<HTMLElement | null>
) => {
  /*
  let markdownViewr: HTMLElement

  onMounted(() => {
    markdownViewr = document.getElementById(targetId) as HTMLElement
    markdownViewr.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    markdownViewr.removeEventListener('scroll', handleScroll)
  })
   */

  const {
    viewerScrollValue,
    updateEditorScrollValue
  } = EditScrollHandleContainer.useContainer()

  let timeoutId: null | number = null
  let isScrollRecieved = false

  const handleScroll = (e: Event) => {
    if (isScrollRecieved) {
      return
    }
    const el = e.target as Element
    if (el && el.clientHeight && el.scrollHeight) {
      const topEnd = el.scrollHeight - el.clientHeight
      if (topEnd > 0) {
        nextTick(() => {
          // context.emit('onScrollUpdatedEditor', el.scrollTop / topEnd)
          updateEditorScrollValue(el.scrollTop / topEnd)
        })
      }
    }
  }

  useEventListener('scroll', handleScroll, false, viewer.value as HTMLElement)

  watchEffect(() => {
    setScrollTop(viewerScrollValue.value)
  })

  const setScrollTop = (v: number) => {
    isScrollRecieved = true
    setTimeout(false)
    // const topEnd = markdownViewr.scrollHeight - markdownViewr.clientHeight
    const topEnd =
      (viewer.value as HTMLElement).scrollHeight -
      (viewer.value as HTMLElement).clientHeight
    nextTick(() => {
      // markdownViewr.scrollTop = topEnd * v
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
}
