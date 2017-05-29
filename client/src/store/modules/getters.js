export const Getters = {
  dataMemo: (state) => {
    return state.dataMemo
  },
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  }
}