export default {
  state: {
    userInfo: {}
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      console.log('mutations:' + userInfo)
      localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    clearUserInfo (state) {
      state.userInfo = {}
      localStorage.removeItem('userInfo')
    }
  },
  actions: {
    setUserInfo (context, userInfo) {
      context.commit('setUserInfo', userInfo)
    },
    clearUserInfo (context) {
      context.commit('clearUserInfo')
    }
  }
}
