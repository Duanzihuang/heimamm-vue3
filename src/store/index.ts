import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: null
  },
  mutations: {
    setUserInfo (state, userInfo: any) {
      state.userInfo = userInfo
    }
  },
  actions: {},
  modules: {}
})
