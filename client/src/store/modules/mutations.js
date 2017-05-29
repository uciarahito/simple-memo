export const Mutations = {
  signIn: (state, payload) => {
    window.localStorage.setItem('token', payload.token)
    window.localStorage.setItem('user', payload.username)
    window.localStorage.setItem('id', payload.id)
    state.user.push(payload)
    // this.$router.push('/')
    window.location = "/"
  },
  dataMemo: (state, payload) => {
    state.dataMemo = payload
  },
  newMemo: (state, payload) => {
    state.dataMemo = payload
  },
  editMemo: (state, payload) => {
    state.dataMemo = payload
  },
  deleteMemo: (state, payload) => {
    state.dataMemo = payload
  }
}