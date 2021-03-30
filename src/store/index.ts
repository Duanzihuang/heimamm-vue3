import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: {}
  },
  getters: {
    // state，就是代表上面的state
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    // 设置仓库中的userInfo，参数1：就是state，参数2：就是存的时候，传递过来的参数
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {},
  modules: {}
})
