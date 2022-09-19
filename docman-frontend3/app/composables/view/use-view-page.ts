import DrawerContainer from '~/containers/drawer-container'

export const useViewPage = () => {
  const {
    isDrawer,
    setDrawer,
    isPermanent,
    setPermanent
  } = DrawerContainer.useContainer()

  const openDrawer = (): void => {
    setDrawer(true)
  }

  const closeDrawer = (): void => {
    setDrawer(false)
  }

  return {
    isDrawer,
    openDrawer,
    closeDrawer,
    isPermanent,
    setPermanent
  }
}
