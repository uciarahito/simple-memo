export const Actions = {
  signIn: ({commit}, payload) => {
    axios.post('http://localhost:3000/signIn', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('Action SignIn');
      console.log(response.data);
      commit('signIn', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  signUp: ({commit}, payload) => {
    axios.post('http://localhost:3000/signUp', {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      console.log('Action SignUp');
      console.log(response.data);
      commit('signUp', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  dataMemoByUser: ({commit}) => {
    axios.get('http://localhost:3000/allMemoByUser', {headers: {'token': window.localStorage.getItem('token')}})
    .then(response => {
      console.log('Action AllMemoByUser');
      console.log(response.data);
      commit('dataMemo', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  newMemo: ({commit}, payload) => {
    axios.post('http://localhost:3000/createMemo', {
      title: payload.title,
      content: payload.content
    }, {headers: {'token': window.localStorage.getItem('token')}})
    .then(response => {
      console.log('Action NewMemo');
      console.log(response.data);
      commit('newMemo', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  editMemo: ({commit}, payload) => {
    console.log('Editttt');
    console.log(payload);
    axios.put(`http://localhost:3000/editMemo/${payload.id}`, {
      title: payload.title,
      content: payload.content
    }, {headers: {'token': window.localStorage.getItem('token')}})
    .then(response => {
      console.log('Action EditMemo');
      console.log(response.data);
      commit('editMemo', response.data)
    })
    .catch(error => {
      console.log(error);
    })
  },
  deleteMemo: ({commit}, payload) => {
    let conf = confirm("Are you sure?")
    if (conf) {
      axios.delete(`http://localhost:3000/deleteMemo/${payload._id}`, {headers: {'token': window.localStorage.getItem('token')}})
      .then(response => {
        console.log('Action DeleteMemo');
        console.log(response.data);
        commit('deleteMemo', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
}