import { Ref, watch } from '@vue/composition-api'

// https://mo2nabe.com/js-search-in-page/
// https://gist.github.com/motsu0/256887a51e37c74508d9d3a81c381057
// https://stackoverflow.com/questions/56724344/get-inner-html-of-parent-but-ignore-a-child-class/56724399
export const useViewContentHeighlight = (
  viewer: Ref<HTMLElement | null>,
  searchKeyword: Ref<string>,
  addNavigateListener: (viewer: Ref<HTMLElement | null>) => void,
  removeNavigateListener: () => void
) => {
  /**
   * コンテンツハイライト処理前後で、ナビゲートリスナの削除、追加を行い、リンクに対するハンドラメソッドの再設定を行う
   */

  watch(
    () => viewer.value,
    () => {
      if (!searchKeyword.value || searchKeyword.value.length < 2) {
        // ナビゲートリスナー削除
        removeNavigateListener()

        // コンテンツハイライトリセット
        resetContentHeighlight()

        // ナビゲートリスナー追加
        addNavigateListener(viewer)
        return
      }

      // コンテンツハイライト更新
      updateContentHeighlight()
    }
  )

  watch(
    () => searchKeyword.value,
    () => {
      if (!searchKeyword.value || searchKeyword.value.length < 2) {
        // ナビゲートリスナー削除
        removeNavigateListener()

        // コンテンツハイライトリセット
        resetContentHeighlight()

        // ナビゲートリスナー追加
        addNavigateListener(viewer)
        return
      }

      // コンテンツハイライト更新
      updateContentHeighlight()
    }
  )

  // eslint-disable-next-line no-undef
  let targets: NodeListOf<HTMLElement>

  /**
   * コンテンツハイライト更新
   */
  const updateContentHeighlight = () => {
    console.log('updateContentHeighlight(): called.')
    if (
      !viewer.value ||
      !searchKeyword.value ||
      searchKeyword.value.length < 2
    ) {
      return
    }

    // FIXME ここが謎。除外しているはずが対象になっている。
    targets = viewer.value!.querySelectorAll<HTMLElement>(
      ':not(pre), :not(code)'
    )

    // ナビゲートリスナー削除
    removeNavigateListener()

    // コンテンツハイライトリセット
    resetContentHeighlight()

    const regexp = new RegExp(
      `(?<=>)[^<>]*?(${searchKeyword.value})[^<>]*?(?=<)`,
      'gi'
    )
    const regexp2 = new RegExp(searchKeyword.value, 'gi')
    Array.from(targets).forEach((target) => {
      target.innerHTML = target.innerHTML.replace(regexp, function () {
        return arguments[0].replace(
          regexp2,
          `<span class="text-heighlight">${searchKeyword.value}</span>`
        )
      })
    })

    // ナビゲートリスナー追加
    addNavigateListener(viewer)
  }

  /**
   * コンテンツハイライトリセット
   */
  const resetContentHeighlight = () => {
    if (!targets) {
      return
    }
    Array.from(targets).forEach((target) => {
      const selects = target.getElementsByClassName('text-heighlight')
      Array.from(selects).forEach((select) => {
        if (select.textContent != null) {
          select.outerHTML = select.textContent
        }
      })
    })
  }

  return {
    updateContentHeighlight
  }
}
