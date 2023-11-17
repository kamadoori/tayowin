export const useInit = () => {
  const localForage = useLocalForage()
  return {
    async getInitialized() {
      try {
        return await localForage.getItem('init')
      } catch (e) {
        return false
      }
    },
    setInitialized(value: boolean) {
      localForage.setItem('init', value)
    },
  }
}
