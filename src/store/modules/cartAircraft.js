import api from "../../api/api";
import moment from "moment";

const state = {
  resultId: null,
  searchId: null,
  ticketPrice: null,
  lastName: null,
  firstName: null,
  passportCode: null,
  gender: null,
  birthDay: null,
  birthMonth: null,
  birthYear: null,

  passportDay: null,
  passportMonth: null,
  passportYear: null,

  country: null,

  personEmail: null,
  personPhone: null
};

const getters = {
  getResultId: (state) => state.resultId,
  getSearchId: (state) => state.searchId,
  getTicketPrice: (state) => state.ticketPrice,
  getLastName: (state) => state.lastName,
  getFirstName: (state) => state.firstName,
  getPassportCode: (state) => state.passportCode,
  getGender: (state) => state.gender,

  getBirthDay: (state) => state.birthDay,
  getBirthMonth: (state) => state.birthMonth,
  getBirthYear: (state) => state.birthYear,

  getPassportDay: (state) => state.passportDay,
  getPassportMonth: (state) => state.passportMonth,
  getPassportYear: (state) => state.passportYear,

  getCountry: (state) => state.country,

  getPersonEmail: (state) => state.personEmail,
  getPersonPhone: (state) => state.personPhone,
};

const actions = {
  async bookingTicketAircraft({ rootState }) {
    //const { token } = rootState.auth
    const params = {
      result_id: rootState.cartAircraft.resultId,
      searchId: rootState.cartAircraft.searchId,

      passenger: {
        firstname: rootState.cartAircraft.firstName,
        lastname: rootState.cartAircraft.lastName,
        birthday: moment(rootState.cartAircraft.birthMonth+'-'+rootState.cartAircraft.birthDay+'-'+rootState.cartAircraft.birthYear).format("DD-MM-YYYY"),
        gender: rootState.cartAircraft.gender,
        citizenship: rootState.cartAircraft.country.code,
        docnum: rootState.cartAircraft.personEmail,
        docExpire: moment(rootState.cartAircraft.passportMonth+'-'+rootState.cartAircraft.passportDay+'-'+rootState.cartAircraft.passportYear).format("DD-MM-YYYY"),
      },
      email: rootState.cartAircraft.personEmail,
      phone: rootState.cartAircraft.personPhone
    };


    const response = await api.bookingTicketAircraft(params);
    console.log(response);

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
  setLastName({ commit }, name) {
    commit("updateLastName", name);
  },
  setFirstName({ commit }, FirstName) {
    commit("updateFirstName", FirstName);
  },
  setPassportCode({ commit }, passportCode) {
    commit("updatePassportCode", passportCode);
  },
  setGender({ commit }, gender) {
    commit("updateGender", gender);
  },
  setBirthDay({ commit }, birthDay) {
    commit("updateBirthDay", birthDay);
  },

  setBirthMonth({ commit }, birthMonth) {
    commit("updateBirthMonth", birthMonth);
  },

  setBirthYear({ commit }, birthYear) {
    commit("updateBirthYear", birthYear);
  },

  setPassportDay({ commit }, passportYear) {
    commit("updatePassportDay", passportYear);
  },
  setPassportMonth({ commit }, passportMonth) {
    commit("updatePassportMonth", passportMonth);
  },
  setPassportYear({ commit }, passportYear) {
    commit("updatePassportYear", passportYear);
  },

  setCountry({ commit }, country) {
    commit("updateCountry", country);
  },

  setPersonEmail({ commit }, email) {
    commit("updatePersonEmail", email);
  },
  setPersonPhone({ commit }, phone) {
    commit("updatePersonPhone", phone);
  },
};
const mutations = {
  updateResultId(state, resultId) {
    state.resultId = resultId;
  },
  updateSearchId(state, searchId) {
    state.searchId = searchId;
  },
  updateTicketPrice(state, price) {
    state.ticketPrice = price;
  },
  updateLastName(state, lastName) {
    state.lastName = lastName;
  },
  updateFirstName(state, firstName) {
    state.firstName = firstName;
  },
  updatePassportCode(state, passportCode) {
    state.passportCode = passportCode;
  },
  updateGender(state, gender) {
    state.gender = gender;
  },
  updateBirthDay(state, birthDay) {
    state.birthDay = birthDay;
  },
  updateBirthMonth(state, birthMonth) {
    state.birthMonth = birthMonth;
  },
  updateBirthYear(state, birthYear) {
    state.birthYear = birthYear;
  },
  updatePassportDay(state, passportDay) {
    state.passportDay = passportDay;
  },
  updatePassportMonth(state, passportMonth) {
    state.passportMonth = passportMonth;
  },
  updatePassportYear(state, passportYear) {
    state.passportYear = passportYear;
  },
  updateCountry(state, country) {
    state.country = country;
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
