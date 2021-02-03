import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem('token') || "",
    user : null,
    pageData: {
      showTestToolBar: false,
      showTestBuilderToolBar: false,
      showAppDrawer: true,
      pageTitle: "TestMe"
    },
    staticUrl: "",
    developerAvatar: "assets/img/dev_avatar.png",
    testmeLogo: "assets/img/testme_logo.png",
    landScapeUrl: "assets/img/card-image-3.jpg", //"assets/img/testme_frontView.png",
    frontView: "assets/img/testme_front_view.png",
    profilePicUrl: "assets/img/avatar.png",
    showTestListDialog: false,
    testTime: '',
    testExit: true,
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getFrontView(state){
      return state.frontView
    },
    getDeveloperAvatar(state){
      return state.developerAvatar
    },
    getLandScapeUrl(state){
      return state.staticUrl + state.landScapeUrl;
    },
    getprofilePicUrl(state){
      return state.staticUrl +  state.landScapeUrl;
    },
    pageTitle(state){
      return state.pageData.pageTitle
    },
    showTestToolBar(state) {
      return state.pageData.showTestToolBar
    },
    showAppDrawer(state){
      return state.pageData.showAppDrawer
    },
    showTestBuilderToolBar(state) {
      return state.pageData.showTestBuilderToolBar
    },
    showTestListDialog(state) {
      return state.showTestListDialog
    },
    userDetail (state) {
      return state.user
    },
    testTime (state) {
      return state.testTime
    },
    testExit (state) {
      return state.testExit
    },
  },
  mutations: {
    setPageData(state, data){
      state.pageData = {
        showTestToolBar: false,
        showTestBuilderToolBar: false,
        showAppDrawer: true,
        pageTitle: "TestMe"
      }
      for(let key in data) {
        state.pageData[key] = data[key]
      }
    },
    updateTestTime(state, data){
      state.testTime = data
    },
    allowTestExit (state, data) {
      state.testExit = data
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = null
    },
    user_data_success(state, user){
      state.user = user
    },
    showTestListDialog(state, value) {
      state.showTestListDialog = value
    }
  },
  actions: {
    getUserData({commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/user/', method: 'GET' })
        .then(resp => {
          //console.log(resp.data)
          const user = resp.data
          commit('user_data_success', user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    updateUserData({commit, dispatch}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/user/', data: user, method: 'PUT' })
        .then(resp => {
          dispatch("getUserData")
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    login({commit, dispatch}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/rest-auth/login/', data: user, method: 'POST' })
        .then(resp => {
          const token = "Token" + " " + resp.data.key
          localStorage.setItem('token', token)
          axios.defaults.headers.common['Authorization'] = token
          commit('auth_success', token)
          dispatch("getUserData")
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    register({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/rest-auth/registration/', data: user, method: 'POST' })
        .then(resp => {
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: '/rest-auth/logout/', method: 'POST' })
        .then(() => {
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
      });
    }
  },
  modules: {}
});
