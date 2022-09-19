import { reactive, toRefs } from '@nuxtjs/composition-api'

export interface TreeEditDialogControllMenu {
  showModal: boolean
  pageId: string
}

export interface TreeEditDialogControllProps {
  treeEditDialogControllMenu: TreeEditDialogControllMenu
}

export const useTreeEditDialogControll = () => {
  const state = reactive({
    treeEditDialogControllMenu: {
      showModal: false,
      pageId: ''
    } as TreeEditDialogControllMenu
  })

  const openDialog = (pageId: string) => {
    console.log(`openDialog(): pageId=${pageId}`)
    state.treeEditDialogControllMenu.pageId = pageId
    state.treeEditDialogControllMenu.showModal = true
  }

  const closeDialog = () => {
    state.treeEditDialogControllMenu.showModal = false
  }

  return {
    ...toRefs(state),
    openDialog,
    closeDialog
  }
}
