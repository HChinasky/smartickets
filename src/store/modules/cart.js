import sumBy from "lodash/sumBy";
import find from "lodash/find";
import findIndex from "lodash/findIndex";
import without from "lodash/without";
import moment from "moment";
var Hashes = require("jshashes");
import api from "../../api/api";
import { decode } from "js-base64";
import i18n from "../../i18n";

const getDefaultState = () => {
  return {
    cart: [],
    tickets: [], //успешно оформленные билеты
    payment_sid: null,
    reusePaymentSID: false,
    ticket: null,
    validationError: false,
    email: null,
    devLogin: null,
    devPassword: null,
  }
}

const state = getDefaultState();

const getters = {
  getCart: (state) => state.cart,

  getTotalPrice: (state) => {
    let ticketPrice = sumBy(state.cart, "train.price");
    let metroPrice = sumBy(state.cart, function(o) {
      if (o.metro.selected) {
        return o.metro.price;
      }
    });
    let price = parseFloat(ticketPrice + (metroPrice || 0) + 0.06).toFixed(2);
    if (state.cart.length > 0) {
      return price;
    } else {
      return parseFloat(0.0).toFixed(2);
    }

    // return parseFloat(ticketPrice + (metroPrice || 0 ) + 0.06).toFixed(2) ;
  },
  getPaymentSID: (state) => state.payment_sid,
  getTickets: (state) => {
    return state.tickets;
  },
  getEmail: (state) => state.email,
  getDevLogin: (state) => state.devLogin,
  getDevPassword: (state) => state.devPassword,
  getValidationErrors: (state) => state.validationErrors,
  getReusePaymentSID: (state) => state.reusePaymentSID,
};

const actions = {
  addItemToCart({ commit }, payload) {
    const cartItem = {
      train: {
        place: payload.place,
        place_type: payload.place_type || null,
        wagon_num: payload.wagon_num,
        train_num: payload.train_num,
        price: payload.price,
        wagon_type: payload.type,
        wagon_class: payload.wagon_class,
        services: {
          doc_type: "FULL", //default value
          bedding: payload.type != "С" ? true : false, //default value
          drinks: 0, //default value
        },
      },
      passenger: {
        name: null,
        surname: null,
      },
      metro: payload.metro,
      booked: false,
      order_info: null,
    };
    commit("addToCart", cartItem);
  },
  removeItemFromCart({ commit, state }, { place, wagon_num }) {
    const cartItem = find(state.cart, function(o) {
      return o.train.place == place && o.train.wagon_num == wagon_num;
    });
    commit("removeFromCart", cartItem);
    /* обнуление статуса остальных элементов в корзине при удалении одного элемента */
    /*временно отключил, пока не работает удаление из корзины  */

    /*
    state.cart.forEach((item) =>
      dispatch("unsetBookedStatus", {
        wagon_num: item.train.wagon_num,
        place: item.train.place,
      })
    );
    */
  },

  updatePassenger({ commit, state }, { wagon_num, place, passenger }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("updatePassengerInfo", { passenger, index });
  },

  updateServices({ commit, state }, { wagon_num, place, services }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("updateServicesInfo", { services, index });
  },

  updateBookedStatus({ commit, state }, { wagon_num, place }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("SET_BOOKED", index);
  },

  unsetBookedStatus({ commit, state }, { wagon_num, place }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("UNSET_BOOKED", index);
    commit("UNSET_ORDER_INFO", index);
  },

  updateMetro({ commit, state, rootState }, { wagon_num, place }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    const from = rootState.metro.station_from;
    const to = rootState.metro.station_to;
    const selected = rootState.metro.isActive;
    commit("SET_METRO", { from, to, selected, index });
  },

  updateEmail({ commit }, email) {
    commit("SET_EMAIL", email);
  },

  updateDevLogin({ commit }, login) {
    commit("SET_DEV_LOGIN", login);
  },

  updateDevPassword({ commit }, login) {
    commit("SET_DEV_PASSWORD", login);
  },

  setMetroFalse({ commit, state }, { wagon_num, place }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("SET_METRO_FALSE", index);
  },

  increaseTicketPrice({ commit, state }, { wagon_num, place, price }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("INCREASE_PRICE", { price, index });
  },

  reduceTicketPrice({ commit, state }, { wagon_num, place, price }) {
    const index = findIndex(state.cart, function(o) {
      return o.train.wagon_num == wagon_num && o.train.place == place;
    });
    commit("REDUCE_PRICE", { price, index });
  },

  updateReusePaymentSID({ commit }, value) {
    commit("SET_REUSE_PAYMENT_SID", value);
  },

  async bookTickets({ rootState, rootGetters, getters, commit }) {
    var MD5 = new Hashes.MD5();
    var SHA256 = new Hashes.SHA256();
    const train = rootGetters.getTrainByNumber(rootState.train.train.number);
    const passengers = [];

    const is_split = getters.getCart.every(
      (item) => item.train.wagon_num === getters.getCart[0].train.wagon_num
    );

    getters.getCart.forEach(function(item) {
      var ticket = {
        bedding: item.train.services.bedding,
        doc_type: item.train.services.doc_type,
        drinks: item.train.services.drinks,
        email: getters.getEmail,
        id_from_metro: item.metro.from ?? 0,
        id_to_metro: item.metro.to ?? 0,
        metro: item.metro.selected,
        name: item.passenger.name,
        place: `${item.train.place}`,
        surname: item.passenger.surname,
        wagon_num: `${item.train.wagon_num}`,
        wagon_type: item.train.wagon_type,
      };
      if (item.train.services.drinks == 1) {
        ticket.addon = "Н";
        ticket.services = "Н";
      } else if (item.train.services.drinks == 2) {
        ticket.addon = "М";
        ticket.services = "М";
      } else {
        ticket.addon = "";
        ticket.services = "";
      }

      if (!ticket.metro) {
        (ticket.id_from_metro = 0), (ticket.id_to_metro = 0);
      }

      passengers.push(ticket);
    });

    var params = {
      uuid: rootState.auth.uuid,
      city_from: `${rootState.stations.departmentStation}`,
      city_to: `${rootState.stations.arrivalStation}`,
      arrival_date: moment(train.arrival_date).format("YYYY-MM-DD"),
      arrival_time: moment(train.arrival_date).format("HH:mm"),
      dep_date: moment(train.departure_date).format("YYYY-MM-DD"),
      dep_time: moment(train.departure_date).format("HH:mm"),
      train_num: train.number,
      login: rootGetters.getIsDevLoginRequired ? getters.getDevLogin : "",
      password: rootGetters.getIsDevLoginRequired ? MD5.hex(getters.getDevPassword) : "",
      passengers: passengers,
      is_split: !is_split,
      req_level: "1.4",
    };

    var sign_str =
      `${params.city_from}` +
      `${params.city_to}` +
      params.dep_date +
      params.is_split +
      params.req_level +
      params.train_num +
      params.uuid;

    passengers.forEach(function(item) {
      sign_str += item.metro;
      sign_str += item.name;
      sign_str += item.place;
      sign_str += item.surname;
      sign_str += item.wagon_num;
      sign_str += item.wagon_type;
      sign_str += item.email;
    });

    //reuse sid
    if (getters.getReusePaymentSID) {
      params.payment_sid = getters.getPaymentSID;
    }
    if(getters.getTicketsFromCart.length > 1) {
      params.payment_sid = localStorage.getItem("payment_sid")
    }

    sign_str += rootState.auth.token;
    params.sign = SHA256.hex(sign_str);
    try {
      const response = await api.bookTickets(params);

      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        response.data.order_info.forEach(function(item) {
          const index = findIndex(getters.getCart, function(o) {
            return (
              o.train.wagon_num == item.wagon_num && o.train.place == item.place
            );
          });

          if (item.code == 0) {
            commit("SET_BOOKED", index);
            rootGetters.getTicketsFromCart.filter((ticket) => {
              if(ticket.type.toLowerCase() === "train") {
                ticket.bookedTrain = true;
                commit('updateTicketsList', ticket, {root: true});
              }
            });
          } else {
            commit("UNSET_BOOKED", index);
          }
          commit("SET_ORDER_INFO", { order_info: item, index });
        });

        commit("SET_PAYMENT_SID", response.data.payment_sid); //FIXME
        commit("SET_REUSE_PAYMENT_SID", true); //переиспользование sid для повторного бронирования
      }
    }


    catch (error) {
      if (error.request) {
        throw new Error(i18n.t("serverNotResponding"));
      } else {
        throw new Error(error.message)
      }
    }

  },
  async startPayment({ rootState, commit }) {
    var SHA256 = new Hashes.SHA256();
    const params = {
      uuid: rootState.auth.uuid,
      //sign: SHA256.hex(getters.getPaymentSID + rootState.auth.token),
      //payment_sid: getters.getPaymentSID,
      sign: SHA256.hex(
        localStorage.getItem("payment_sid") + rootState.auth.token
      ),
      payment_sid: localStorage.getItem("payment_sid"),
    };


    const response = await api.initPayment(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      commit("SET_REUSE_PAYMENT_SID", false); //удаляем переиспользование sid при успешной оплате. а при неуспешной?
      return decode(response.data.html);
    }

  },
  async fetchTickets({ commit }) {
    var SHA256 = new Hashes.SHA256();
    const params = {
      uuid: localStorage.getItem("uuid"),
      sign: SHA256.hex(
        localStorage.getItem("payment_sid") + localStorage.getItem("token")
      ),
      payment_sid: localStorage.getItem("payment_sid"),
    };
    const response = await api.fetchTickets(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      commit("UPDATE_TICKETS", response.data.tickets);
    }
  },

  async downloadTicket({ rootState }, payload) {
    console.log(rootState.auth.uuid);
    const params = {
      uuid: localStorage.getItem("uuid"),
      //uuid: rootState.auth.uuid,
      pack_num: payload.pack_num,
      trn_date: payload.trn_date,
      html: payload.html,
    };
    const response = await api.downloadTicket(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      return response.data;
    }
  },
  async sendTicketToEmail({ rootState }, payload) {
    console.log(rootState.auth.uuid);
    const params = {
      uuid: localStorage.getItem("uuid"),
      pack_num: payload.pack_num,
      trn_date: payload.trn_date,
      html: payload.html,
    };
    const response = await api.sendTicketToEmail(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      return response.data;
    }
  },

  async validateTicket({ rootState }, payload) {
    console.log(rootState.auth.uuid);
    const params = {
      pin: payload.pin,
      orderNum: payload.orderNum,
      date: payload.date,
    };
    const response = await api.validateTicket(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      return response.data.data;
    }
  },
  clearCart({ commit }) {
    commit("UNSET_CART", []);
  },
};

const mutations = {
  addToCart(state, cartItem) {
    state.cart.push(cartItem);
  },
  removeFromCart(state, cartItem) {
    state.cart = without(state.cart, cartItem);
  },
  updatePassengerInfo(state, { passenger, index }) {
    state.cart[index].passenger = passenger;
  },
  updateServicesInfo(state, { services, index }) {
    state.cart[index].train.services = services;
  },

  INCREASE_PRICE(state, { price, index }) {
    state.cart[index].train.price += price;
  },

  REDUCE_PRICE(state, { price, index }) {
    state.cart[index].train.price -= price;
  },

  SET_BOOKED(state, index) {
    state.cart[index].booked = true;
  },
  UNSET_BOOKED(state, index) {
    state.cart[index].booked = false;
  },
  UNSET_ORDER_INFO(state, index) {
    state.cart[index].order_info = null;
  },

  SET_PAYMENT_SID(state, payment_sid) {
    state.payment_sid = payment_sid;
    localStorage.setItem("payment_sid", payment_sid); //FIXME
  },

  SET_REUSE_PAYMENT_SID(state, value) {
    state.reusePaymentSID = value;
  },

  SET_MSG(state, { msg, index }) {
    state.cart[index].msg = msg;
  },

  SET_ORDER_INFO(state, { order_info, index }) {
    state.cart[index].order_info = order_info;
  },

  SET_METRO(state, { from, to, selected, index }) {
    state.cart[index].metro.from = from;
    state.cart[index].metro.to = to;
    state.cart[index].metro.selected = selected;
  },
  SET_METRO_FALSE(state, index) {
    state.cart[index].metro.selected = false;
  },
  UPDATE_TICKETS(state, tickets) {
    state.tickets = tickets;
  },
  UPDATE_TICKET(state, ticket) {
    state.ticket = ticket;
  },

  SET_EMAIL(state, email) {
    state.email = email;
  },

  SET_DEV_LOGIN(state, login) {
    state.devLogin = login;
  },
  SET_DEV_PASSWORD(state, password) {
    state.devPassword = password;
  },

  SET_CART_VALIDATION_ERROR(state, error) {
    state.validationError = error;
  },

  SET_VALIDATION_ERROR(state, { index, field }) {
    state.cart[index].validationErrors.push(field);
  },

  UNSET_CART(state) {
    state.cart = [];
    state.reusePaymentSID = false;
  },
  /*
  REMOVE_VALIDATION_ERROR(state, { index, field }) {
    state.cart[index].validationErrors = without(
      state.cart[index].validationErrors,
      field
    );
  },
*/
};

export default {
  state,
  getters,
  actions,
  mutations,
};
