import api from "../../api/api";
import i18n from "../../i18n";
import moment from "moment";

const state = {
  airports: [],
  availableDates: [],
  departmentCityCode: null,
  arrivalCityCode: null,


  departmentCountry: null,
  arrivalCountry: null,

  departmentMainCityCode: null,
  arrivalMainCityCode: null,

  cityDepartmentDate: null,
  cityArrivalDate: null,

  isDevSkyUpLoginRequired: null
};

const getters = {
  getAirports: (state) => state.airports,
  getAvailableDates: (state) => state.availableDates,
  getAirportsNameById: (state) => (code) => {
    return state.airports.find((airport) => airport.code === code);
  },
  getDepartmentCityCode: (state) => state.departmentCityCode,
  getDepartmentCountry: (state) => state.departmentCountry,
  getArrivalCityCode: (state) => state.arrivalCityCode,

  getDepartmentMainCityCode: (state) => state.departmentMainCityCode,
  getArrivalMainCityCode: (state) => state.arrivalMainCityCode,

  getIsDevSkyUpLoginRequired: (state) => state.isDevSkyUpLoginRequired,

  getCityDepartmentDate: (state) => state.cityDepartmentDate,
  getCityArrivalDate: (state) => state.cityArrivalDate,

  getCityNameByCode: (state) => (code) => {
    return state.airports.find((cities) => cities.code === code).city_name;
  },
  getSecondCityNameByCode: (state) => (code) => {
    return state.airports.find((cities) => cities.code === code).second_city_name;
  },
  getCityCountryByCode: (state) => (code) => {
    return state.airports.find((cities) => cities.code === code).country_name;
  },
};

const actions = {
  async fetchAirports({ rootState, commit }) {
    const response = await api.fetchAirports(rootState.auth.uuid);

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {

      var airports = response.data.data.airports.map((airport) => ({
        city_code: airport.city_code,
        label: i18n.locale == "uk" ? airport.city_name_uk : airport.city_name_en,
        city_name:  i18n.locale == "uk" ? airport.city_name_uk : airport.city_name_en,
        second_city_name:  i18n.locale == "uk" ? airport.name_uk : airport.name_en,
        country_name:  i18n.locale == "uk" ? airport.country_name_uk : airport.country_name_en,
        code: airport.code,
        is_new: airport.is_new,
        terminal: airport.terminal,
        connection: airport.connections
      }));
      commit("setAirports", airports);
      commit("setPaymentId", response.data.payment_sid);
      commit("SET_DEV_SKYUP_LOGIN_REQUIRED", response.data.NEED_AUTH_SkyUp);
    }
  },
  async fetchAvailableDate({ getters, commit }, payload) {
    let dateFormat = payload.date ? moment(payload.date).format("DD-MM-YYYY") : moment(new Date()).format("DD-MM-YYYY")
    const params = {
      "type": "SkyUp",
      "lng_id": 1,
      "departure": payload.department,
      "arrival": payload.arrival,
      "date": dateFormat,
      "for_next_days": 365,
      "adt": getters.getPassengersByType("ADT"),
      "chd": getters.getPassengersByType("CHD"),
      "inf": getters.getPassengersByType("INF"),
      "group_by_date": 1
    }
    const response = await api.availableDate(params);
    commit("setAvailableDates", response.data);
    return response;
  },
  setDepartmentCountry({ commit }, data) {
    commit("updateCountryDepartment", data);
  },
  setArrivalCountry({ commit }, data) {
    commit("updateCountryArrival", data);
  },
  setDepartmentCityCode({ commit }, data) {
    commit("updateDepartmentCityCode", data);
  },
  setDepartmentMainCityCode({ commit }, data) {
    commit("updateDepartmentMainCityCode", data);
  },
  setArrivalMainCityCode({ commit }, data) {
    commit("updateArrivalMainCityCode", data);
  },
  setArrivalCityCode({ commit }, data) {
    commit("updateArrivalCityCode", data);
  },
}

const mutations = {
  setAirports: (state, airports) => {
    state.airports = airports;
  },
  setAvailableDates: (state, airports) => {
    state.availableDates = airports;
  },
  clearAircrafts(state) {
    state.aircrafts = null;
  },
  setPaymentId(state, payment_sid) {
    state.payment_sid = payment_sid;
    localStorage.setItem("payment_sid", payment_sid); //FIXME
  },
  updateCountryDepartment(state, country) {
    state.departmentCountry = country;
  },
  updateCountryArrival(state, country) {
    state.arrivalCountry = country;
  },
  updateDepartmentCityCode(state, city) {
    state.departmentCityCode = city;
  },
  updateArrivalCityCode(state, city) {
    state.arrivalCityCode = city;
  },
  updateCityArrivalDate(state, date) {
    state.cityArrivalDate = date;
  },
  updateDepartmentMainCityCode(state, date) {
    state.departmentMainCityCode = date;
  },
  updateArrivalMainCityCode(state, date) {
    state.arrivalMainCityCode = date;
  },
  updateCityDepartmentDate(state, date) {
    state.cityDepartmentDate = date;
  },
  SET_DEV_SKYUP_LOGIN_REQUIRED(state, isRequired) {
    state.isDevSkyUpLoginRequired = isRequired;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
