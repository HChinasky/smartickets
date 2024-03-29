import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import stations from "./modules/stations";
import airports from "./modules/airports";
import train from "./modules/train";
import aircraft from "./modules/aircraft";
import cartAircraft from "./modules/cartAircraft";
import allCart from "./modules/allCart";
import cart from "./modules/cart";
import metro from "./modules/metro";
import * as notification from "./modules/notification";

Vue.use(Vuex);


const dataState = createPersistedState({
  storage: window.sessionStorage,
  //paths: ['stations', 'train', 'cart', 'metro', 'notification', "auth"]
  //paths: ['stations', 'train', 'cart', 'metro', 'notification', "auth"],
  //paths: ['stations', 'train', 'cart', 'notification', "auth"],

  paths: ["stations", "airports", "cartAircraft", "allCart", "train", "aircraft", "cart", 'notification', "auth", "metro.stations"],

});



export default new Vuex.Store({
  modules: {
    auth,
    stations,
    airports,
    cartAircraft,
    allCart,
    train,
    aircraft,
    cart,
    metro,
    notification,
  },
  plugins: [dataState],
});
