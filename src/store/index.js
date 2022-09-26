import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import router from "../router/index";


Vue.use(Vuex);

// const uri = "http://localhost:3000";
const uri = "";

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
    
  },
  mutations: {
    login: (state, payload) => {
      state.token = payload.data;
    }
  },

  actions: {
    login: ({ commit }, payload) => {
      axios.post(uri + "/index/auth", payload).then((res) => {
        localStorage.setItem("token", res.data.token);
        router.push({ name: "Home" });
        router.go()
        commit("login", res.data);
      });
    },
  }
});
