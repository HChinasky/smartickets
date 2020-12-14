import api from "../../api/api";
import moment from "moment";
import { getField, updateField } from 'vuex-map-fields';

const state = {
  resultId: "",
  searchId: "",
  ticketPrice: "",
  passengers: [
    {
      type: "ADT",
      firstName: "",
      lastName: "",
      genders: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      country: "",
      passportCode: "",
      passportDay: "",
      passportMonth: "",
      passportYear: "",
    },
  ],
  personEmail: "",
  personPhone: "",
  promoCode: "GL-SMART"
};

const getters = {
  getField,
  getResultId: (state) => state.resultId,
  getTicketPrice: (state) => state.ticketPrice,
  getPersonEmail: (state) => state.personEmail,
  getPersonPhone: (state) => state.personPhone,
  getPromoCode: (state) => state.promoCode,
  getPassengersByType: (state) => (type) => {
    return state.passengers.filter((passengers) => passengers.type.indexOf(type) !== -1).length;
  },
};

const actions = {
  async bookingTicketAircraft({ rootState }) {
    var passenger = [];
    rootState.cartAircraft.passengers.forEach((element, index) => {
      passenger[index] = {
        "type": element.type,
        "firstname": element.firstName,
        "lastname": element.lastName,
        "birthday": moment(element.birthMonth+'-'+element.birthDay+'-'+element.birthYear).format("DD-MM-YYYY"),
        "gender": element.genders,
        "citizenship": element.country.code,
        "docnum": element.passportCode,
        "doc-expire": moment(element.passportMonth+'-'+element.passportDay+'-'+element.passportYear).format("DD-MM-YYYY")
      }
    })
    const params = {
      "type": "SkyUp",
      "result_id": rootState.cartAircraft.resultId,
      "search_id": rootState.cartAircraft.searchId,
      "payment_sid": localStorage.getItem("payment_sid"),
      "passengers": passenger,
      "email": rootState.cartAircraft.personEmail,
      "phone": rootState.cartAircraft.personPhone,
      "agent_email": "test.solveast@gmail.com",
      "promocode": rootState.cartAircraft.promoCode
      // ...(rootState.cartAircraft.promoCode && {"promocode": rootState.cartAircraft.promoCode})
    };

    var response = await api.bookingTicketAircraft(params);
    return response;
  },
  async getCurrentPrice({rootState, commit}) {
    const params = {
      "type": "SkyUp",
      "result_id": rootState.cartAircraft.resultId,
      "promocode": rootState.cartAircraft.promoCode,
    };

    var response = await api.getPrice(params);

    if(response.data.errors.length === 0) {
      commit("updateTicketPrice", response.data.data.price_with_discount.toFixed(2));
    }

    return response;
  },
  setResultId({ commit }, data) {
    commit("updateResultId", data);
  },
  setSearchId({ commit }, data) {
    commit("updateSearchId", data);
  },
  setTicketPrice({ commit }, price) {
    commit("updateTicketPrice", price);
  },
  setPersonEmail({ commit }, email) {
    commit("updatePersonEmail", email);
  },
  setPersonPhone({ commit }, phone) {
    commit("updatePersonPhone", phone);
  },
  setPromoCode({ commit }, promo) {
    commit("updatePromoCode", promo);
  },
  clearPromoCode({ commit }) {
    commit("updatePromoCode", null);
  },
};
const mutations = {
  updateField,
  addPassengerRow(state, typePassenger) {
    state.passengers.push({
      type: typePassenger,
      firstName: "",
      lastName: "",
      genders: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      country: "",
      passportCode: "",
      passportDay: "",
      passportMonth: "",
      passportYear: "",
    });
  },
  removePassengerRow(state, type) {
    var removeIndex = state.passengers.map(function(item) { return item.type; }).indexOf(type);
    state.passengers.splice(removeIndex, 1)
  },
  updateResultId(state, resultId) {
    state.resultId = resultId;
  },
  updateSearchId(state, searchId) {
    state.searchId = searchId;
  },
  updateTicketPrice(state, price) {
    state.ticketPrice = price;
  },
  updatePersonEmail(state, email) {
    state.personEmail = email;
  },
  updatePersonPhone(state, phone) {
    state.personPhone = phone;
  },
  updatePromoCode(state, promo) {
    state.promoCode = promo;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
