import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

Vue.use(Vuelidate);




export const eventBus = new Vue({

  methods: {
    passPhoto(photo) {
      this.$emit("photoChanged", photo);
    },
    
  }
});
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
