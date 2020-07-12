import { reactive, toRefs } from 'nuxt-composition-api'
import { createContainer } from 'vue-unstated'
import { PageData } from '~/models/page/PageData'
import { usePage } from '~/hooks/usePage'

const useDisplayPage = () => {
  const state = reactive({
    page: {
      documentId: '',
      pageId: '',
      pageTitle: '',
      pageData: '',
      createdAt: '',
      updatedAt: ''
    } as PageData
  })

  const { getPage } = usePage()

  const fetchPage = async (pageId: string): Promise<void> => {
    const pageData = await getPage(pageId)
    setPage(pageData)
  }

  const setPage = (pageData: PageData): void => {
    state.page = pageData
  }

  return {
    ...toRefs(state),
    setPage,
    fetchPage
  }
}

export default createContainer(useDisplayPage)
