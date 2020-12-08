import api from "../../api/api";
import i18n from "../../i18n";

const state = {
  airports: [],
  departmentAirports: null,
  arrivalAirports: null,
  flightArrivalDate: null,
  flightDepartmentDate: null
};

const getters = {
  getAirports: (state) => state.airports,
  getDepartmentAirports: (state) => state.departmentAirports,
  getFlightDepartmentDate: (state) => state.flightDepartmentDate,
  getArrivalAirports: (state) => state.arrivalAirports,
  getFlightArrivalDate: (state) => state.flightArrivalDate,
  getAirportsNameById: (state) => (code) => {
    return state.airports.find((airport) => airport.code === code);
  },

};

const actions = {
  async fetchAirports({ rootState, commit }) {
    const response = await api.fetchAirports(rootState.auth.uuid);

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      var airports = response.data.data.airports.map((airports) => ({
        code: airports.code,
        label: i18n.locale == "uk" ? airports.name_uk : airports.name_en,
        terminal: airports.terminal,
      }));
      commit("setAirports", airports);
    }
  },
  setDepartmentAirports({ commit }, data) {
    commit("updateDepartmentAirports", data);
  },
  setArrivalAirports({ commit }, data) {
    commit("updateArrivalAirports", data);
  },
  setFlightArrivalDate({ commit }, date) {
    commit("updateFlightArrivalDate", date);
  },
  setFlightDepartmentDate({ commit }, date) {
    commit("updateFlightDepartmentDate", date);
  },
  clearSelectedAirports({ commit }) {
    commit("updateDepartmentAirports", null);
    commit("updateArrivalAirports", null);
  },
  clearSelectedDates({ commit }) {
    commit("updateFlightArrivalDate", null);
    commit("updateFlightDepartmentDate", null);
  }
}

const mutations = {
  setAirports: (state, airports) => {
    state.airports = airports;
  },
  updateDepartmentAirports(state, airports) {
    state.departmentAirports = airports;
  },
  updateArrivalAirports(state, airports) {
    state.arrivalAirports = airports;
  },
  updateFlightArrivalDate(state, date) {
    state.flightArrivalDate = date;
  },
  updateFlightDepartmentDate(state, date) {
    state.flightDepartmentDate = date;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
