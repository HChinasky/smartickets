import Vue from "vue";
import configPlugin from "@/config";
import i18n from "./i18n";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import vSelect from "vue-select";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/main.css";
import "./assets/css/styles.css";
import "vue-select/dist/vue-select.css";
import "nprogress/nprogress.css";
import "vue-loading-overlay/dist/vue-loading.css";
import Toasted from "vue-toasted";
import VuePromiseBtn from "vue-promise-btn";
import "vue-promise-btn/dist/vue-promise-btn.css";
import AsyncComputed from "vue-async-computed";
import { isMobile } from "mobile-device-detect";
import VueScrollTo from "vue-scrollto";
import VueAnalytics from "vue-analytics";
import VModal from 'vue-js-modal'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);

Vue.directive("back", {
  bind(el) {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      router.back();
    });
  },
});

Vue.use(configPlugin);
Vue.use(Toasted);
Vue.use(VuePromiseBtn);
Vue.use(AsyncComputed);
Vue.use(VueScrollTo);
Vue.use(VModal);
Vue.use(VTooltip);

Vue.use(VueAnalytics, {
  id: "UA-178767013-1",
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production'
  },
  router
});

Vue.toasted.register(
  "my_app_error",
  (payload) => {
    if (!payload.message) {
      return "Oops.. Something Went Wrong...";
    }
    return payload.message;
  },
  {
    type: "error",
    theme: "bubble",
    position: isMobile ? "top-right" : "bottom-right",
    duration: 5000,
  }
);

Vue.toasted.register(
  "my_app_success",
  (payload) => {
    if (!payload.message) {
      return "Request successful!";
    }
    return payload.message;
  },
  {
    type: "success",
    theme: "bubble",
    position: isMobile ? "top-right" : "bottom-right",
    duration: 5000,
  }
);

new Vue({
  router,
  store,
  i18n,
  components: {
    vSelect,
  },
  render: (h) => h(App),
}).$mount("#app");
