import i18n from "../../i18n";
import api from "../../api/api";

const state = {
  cities: [],
  departmentCity: null,
  departmentCityCode: null,
  arrivalCity: null,
  arrivalCityCode: null,
  cityDepartmentDate: null,
  cityArrivalDate: null,

};

const getters = {
  getCities: (state) => state.cities,
  getDepartmentCity: (state) => state.departmentCity,
  getDepartmentCityCode: (state) => state.departmentCityCode,
  getArrivalCity: (state) => state.arrivalCity,
  getArrivalCityCode: (state) => state.arrivalCityCode,
  getCityDepartmentDate: (state) => state.cityDepartmentDate,
  getCityArrivalDate: (state) => state.cityArrivalDate,
  getCityNameById: (state) => (id) => {
    return state.cities.find((cities) => cities.id === id)?.label;
  },
  getCityCodeById: (state) => (id) => {
    return state.cities.find((cities) => cities.id === id)?.code;
  },
  getCityNameByCode: (state) => (code) => {
    return state.cities.find((cities) => cities.code === code)?.label;
  },

};

const actions = {
  async fetchCity({ commit }) {
    const response = await api.fetchCityAirports();

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      var cities = response.data.data.cities.map((city) => ({
        id: city.id,
        label: i18n.locale == "uk" ? city.name_uk : city.name_en,
        text: i18n.locale == "uk" ? city.name_uk : city.name_en,
        code: city.code,
      }));
      commit("setCities", cities);
    }
  },


  setDepartmentCity({ commit }, data) {
    commit("updateDepartmentCity", data);
  },
  setDepartmentCityCode({ commit }, data) {
    commit("updateDepartmentCityCode", data);
  },
  setArrivalCity({ commit }, data) {
    commit("updateArrivalCity", data);
  },
  setArrivalCityCode({ commit }, data) {
    commit("updateArrivalCityCode", data);
  },
  setCityArrivalDate({ commit }, date) {
    commit("updateArrivalDate", date);
  },
  setCityDepartmentDate({ commit }, date) {
    commit("updateDepartmentDate", date);
  },
  clearSelectedCities({ commit }) {
    commit("updateDepartmentCity", null);
    commit("updateArrivalCity", null);
  },

};

const mutations = {
  setCities: (state, cities) => {
    state.cities = cities;
  },
  updateDepartmentCity(state, city) {
    state.departmentCity = city;
  },
  updateDepartmentCityCode(state, city) {
    state.departmentCityCode = city;
  },
  updateArrivalCity(state, city) {
    state.arrivalCity = city;
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

};

export default {
  state,
  getters,
  actions,
  mutations,
};
