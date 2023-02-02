import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: []
  },
  mutations: {
    storeTodos(state, payload) {
      state.todos = payload
    }
  },
  actions: {
    getTodos({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          return axios.get('http://localhost:3000/todos').then(response => {
            commit('storeTodos', response.data)
            resolve()
          })
        }, 1000)
      })
    }
  },
  getters: {},
  modules: {}
})
