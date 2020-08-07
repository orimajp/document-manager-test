import { Ref } from '@vue/composition-api'
import { useEventListener } from '@vueuse/core'

const LEAVE_CONFIRM_MESSAGE =
  '編集中のデータを破棄してページを離れます。よろしいですか？'

export const useBeforeUnloadConfirm = (
  change: Ref<boolean>,
  savePage: Ref<boolean>
) => {
  useEventListener('beforeunload', (event: BeforeUnloadEvent) => {
    if (change.value && !savePage.value) {
      event.preventDefault()
      // ここのメッセージはブラウザ依存
      event.returnValue = LEAVE_CONFIRM_MESSAGE
    }
  })

  // FIXME 現状、Vue Composition APIにおいて、Vue-Routerによる画面遷移をガードする手段は無いっぽい
}
