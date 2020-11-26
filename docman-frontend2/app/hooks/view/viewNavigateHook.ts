import { Ref } from '@vue/composition-api'
import { useInnerPath } from '~/hooks/view/viewInnerPathHook'
import { useRouter } from '~/hooks/useRouter'

// FIXME
const goHeadline = (id: string) => {
  window.location.href = `#${id}`
  setTimeout(() => window.scrollBy(0, -60), 100)
}

// FIXME
const goFootNode = (id: string) => {
  window.location.href = `#${id}`
}

export const useNavigate = () => {
  const { router } = useRouter()
  const { getInnerPath } = useInnerPath()

  // eslint-disable-next-line no-undef
  let links = {} as HTMLCollectionOf<HTMLAnchorElement> | undefined

  const navigate = (event: Event) => {
    const hrefs = (event.target as Element).getAttribute('href')
    if (!hrefs) {
      return
    }

    event.preventDefault()

    const innerPath = getInnerPath(hrefs)
    if (innerPath === null) {
      window.open(hrefs, '_blank')
      return
    }

    if (innerPath.startsWith('#fnref')) {
      goHeadline(innerPath.slice(1))
      return
    }

    if (innerPath.startsWith('#')) {
      // FIXME ここは難しい。脚注へのリンクとは限らない
      goFootNode(innerPath.slice(1))
      return
    }

    return router.push(innerPath)
  }

  const addNavigateListener = (viewer: Ref<HTMLElement | null>) => {
    links = viewer.value?.getElementsByTagName('a')
    if (!links) {
      return
    }
    Array.from(links).forEach((element) => {
      element.addEventListener('click', navigate)
    })
  }

  const removeNavigateListener = () => {
    if (!links) {
      return
    }
    Array.from(links).forEach((element) => {
      element.removeEventListener('click', navigate)
    })
  }

  return {
    addNavigateListener,
    removeNavigateListener
  }
}
