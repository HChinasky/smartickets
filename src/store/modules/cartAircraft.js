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
      birthDay: 1,
      birthMonth: 1,
      birthYear: new Date().getFullYear(),
      country: '',
      passportCode: '',
      passportDay: 1,
      passportMonth: 1,
      passportYear: new Date().getFullYear(),
    },
  ],
  personEmail: "",
  personPhone: ""
};

const getters = {
  getField,
  getResultId: (state) => state.resultId,
  getTicketPrice: (state) => state.ticketPrice,
  getPersonEmail: (state) => state.personEmail,
  getPersonPhone: (state) => state.personPhone,
  getPassengersByType: (state) => (type) => {
    return state.passengers.filter((passengers) => passengers.type.indexOf(type) !== -1).length;
  },
};

const actions = {
  async bookingTicketAircraft({ rootState }) {
    //const { token } = rootState.auth
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
      result_id: rootState.cartAircraft.resultId,
      searchId: rootState.cartAircraft.searchId,
      payment_sid: localStorage.getItem("payment_sid"),

      passenger: passenger,
      email: rootState.cartAircraft.personEmail,
      phone: rootState.cartAircraft.personPhone
    };

    await api.bookingTicketAircraft(params);
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
};
const mutations = {
  updateField,
  addPassengerRow(state, typePassenger) {
    state.passengers.push({
      type: typePassenger,
      firstName: "",
      lastName: "",
      genders: "0",
      birthDay: 1,
      birthMonth: 1,
      birthYear: new Date().getFullYear(),
      country: "",
      passportCode: "",
      passportDay: 1,
      passportMonth: 1,
      passportYear: new Date().getFullYear(),
    });
  },
  removePassengerRow(state) {
    state.passengers.pop();
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
