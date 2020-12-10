import api from "../../api/api";
import moment from "moment";
import { getField, updateField } from 'vuex-map-fields';

const state = {
  resultId: null,
  searchId: null,
  ticketPrice: null,
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
  getField,
  getResultId: (state) => state.resultId,
  getSearchId: (state) => state.searchId,
  getTicketPrice: (state) => state.ticketPrice,
  getLastName: (state) => state.lastName,
  getFirstName: (state) => state.passengers.firstname,
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
    console.log(params.passenger);

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
      country: '',
      passportCode: '',
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
  updateLastName(state, lastName) {
    state.lastName = lastName;
  },
  updateFirstName(state, firstName) {
    state.passengers = firstName;
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
// {
//   "type": "SkyUp",
//   "lng_id": "UA",
//   "result_id": "84e080ff595ce05bacee296c7e180720",
//   "search_id": "47791",
//   "payment_sid": "pefexbcqqlvghwqmfvooikyjdwyak",
//   "passengers": [
//   {
//     "type": "ADT",
//     "firstname": "John",
//     "lastname": "Doe",
//     "birthday": "1982-01-01",
//     "gender": "M",
//     "citizenship": "UA",
//     "docnum": "FF000000",
//     "doc-expire": "2030-01-01"
//   }
// ],
//   "email": "test.solveast@gmail.com",
//   "phone": "0950000000",
//   "agent_email": "test.solveast@gmail.com"
// }
