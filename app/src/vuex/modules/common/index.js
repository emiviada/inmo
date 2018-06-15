// mutation types
const SHOW_GO_BACK = 'common/showGoBack'
const HIDE_GO_BACK = 'common/hideGoBack'

// Common state
const state = {
  showGoBack: 0
}
// Getters
const getters = {
  showGoBack: state => state.showGoBack
}
// Actions
const actions = {
  showGoBack ({ commit }) {
    commit(SHOW_GO_BACK)
  },
  hideGoBack ({ commit }) {
    commit(HIDE_GO_BACK)
  }
}
// Mutations
const mutations = {
  [SHOW_GO_BACK] (state) {
    state.showGoBack = 1
  },
  [HIDE_GO_BACK] (state) {
    state.showGoBack = 0
  }
}

export default {
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations
}
