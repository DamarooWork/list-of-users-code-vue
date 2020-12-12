import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem('users') || '[]')
  },
  mutations: {
    createUser(state, user) {
      state.users.push(user)

      localStorage.setItem('users', JSON.stringify(state.users))
    }

  },
  actions: {
    createUser({commit}, user) {
      commit('createUser', user)
    }
  },
  getters: {
    users: s => s.users
  }
})
