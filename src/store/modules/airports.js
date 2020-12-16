import api from "../../api/api";
import i18n from "../../i18n";

const state = {
  airports: [],
  departmentCityCode: null,
  arrivalCityCode: null,

  departmentMainCityCode: null,
  arrivalMainCityCode: null,

  cityDepartmentDate: null,
  cityArrivalDate: null,

  isDevSkyUpLoginRequired: null
};

const getters = {
  getAirports: (state) => state.airports,
  getAirportsNameById: (state) => (code) => {
    return state.airports.find((airport) => airport.code === code);
  },
  getDepartmentCityCode: (state) => state.departmentCityCode,
  getArrivalCityCode: (state) => state.arrivalCityCode,

  getDepartmentMainCityCode: (state) => state.departmentMainCityCode,
  getArrivalMainCityCode: (state) => state.arrivalMainCityCode,

  getIsDevSkyUpLoginRequired: (state) => state.isDevSkyUpLoginRequired,

  getCityDepartmentDate: (state) => state.cityDepartmentDate,
  getCityArrivalDate: (state) => state.cityArrivalDate,

  getCityNameByCode: (state) => (code) => {
    return state.airports.find((cities) => cities.code === code)?.label;
  },
  getMainCityNameByCode: (state) => (code) => {
    return state.airports.find((cities) => cities.code === code)?.mainCity;
  },
};

const actions = {
  async fetchAirports({ rootState, commit }) {
    const response = await api.fetchAirports(rootState.auth.uuid);

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {

      var airports = response.data.data.airports.filter((airport) => airport.check_in_allow == "1")
                      .map((airport) => ({
                        label: i18n.locale == "uk" ? airport.name_uk : airport.name_en,
                        mainCity: i18n.locale == "uk" ? airport.city_name_uk : airport.city_name_en,
                        mainCityCode: airport.city_code,
                        code: airport.code,
                        terminal: airport.terminal,
                      }));
      commit("setAirports", airports);
      commit("setPaymentId", response.data.payment_sid);
      commit("SET_DEV_SKYUP_LOGIN_REQUIRED", response.data.NEED_AUTH_SkyUp);
    }
  },
  setDepartmentCityCode({ commit }, data) {
    commit("updateDepartmentCityCode", data);
  },
  setArrivalCityCode({ commit }, data) {
    commit("updateArrivalCityCode", data);
  },
  setDepartmentMainCityCode({ commit }, data) {
    commit("updateDepartmentMainCityCode", data);
  },
  setArrivalMainCityCode({ commit }, data) {
    commit("updateArrivalMainCityCode", data);
  },
}

const mutations = {
  setAirports: (state, airports) => {
    state.airports = airports;
  },
  clearAircrafts(state) {
    state.aircrafts = null;
  },
  setPaymentId(state, payment_sid) {
    state.payment_sid = payment_sid;
    localStorage.setItem("payment_sid", payment_sid); //FIXME
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
  updateCityDepartmentDate(state, date) {
    state.cityDepartmentDate = date;
  },
  updateDepartmentMainCityCode(state, date) {
    state.departmentMainCityCode = date;
  },
  updateArrivalMainCityCode(state, date) {
    state.arrivalMainCityCode = date;
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
