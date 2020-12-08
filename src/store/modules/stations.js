//import moment from "moment";
import "moment/locale/uk";
import uniqBy from "lodash/uniqBy";
//import filter from "lodash/filter";
import { ungzip } from "pako";
import api from "../../api/api";

const state = {
  stations: [],
  kyivStations: [2200001, 2200002, 2200003, 2200004, 2200005, 2200660, 2201180],
  popularRoutes: [
    { from: 2218095, to: 2214060 },
    { from: 2200300, to: 2214060 },
    { from: 2208536, to: 2218400 },
    { from: 2200001, to: 2210700 },
    //{ from: 2218000, to: 2300585 },
    { from: 2214400, to: 2218000 },
    { from: 2200001, to: 2208580 },
    { from: 2200001, to: 2208530 },
    //{ from: 2200001, to: 2208580 },
    { from: 2210680, to: 2218000 },
    { from: 2208001, to: 2218095 },
    { from: 2218200, to: 2200001 },
  ],
  departmentStation: null,
  arrivalStation: null,
  arrivalDate: null,
  departmentDate: null,

};

const getters = {
  getStations: (state) => state.stations,
  getKyivStations: (state) => state.kyivStations,
  getDepartmentStation: (state) => state.departmentStation,
  getDepartmentDate: (state) => state.departmentDate,
  getArrivalStation: (state) => state.arrivalStation,
  getArrivalDate: (state) => state.arrivalDate,
  getPopularRoutes: (state) => state.popularRoutes,

  //allTrains: (state) => state.trains,
  getStationNameById: (state) => (id) => {
    return state.stations.find((station) => station.id === id)?.label;
  },

};

const actions = {
  async fetchStations({ rootState, commit }) {
    const response = await api.fetchStations(rootState.auth.uuid);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      var data = atob(response.data.data)
        .split("")
        .map(function(e) {
          return e.charCodeAt(0);
        });

      var uncompressedData = ungzip(data, {
        to: "string",
      });

      var stations = JSON.parse(uncompressedData).map((station) => ({
        id: station.ID,
        label: station.name,
        text: station.name,
      }));
      console.log(stations)
      commit("setStations", uniqBy(stations, "id"));
    }
  },


  setDepartmentStation({ commit }, data) {
    commit("updateDepartmentStation", data);
  },
  setArrivalStation({ commit }, data) {
    commit("updateArrivalStation", data);
  },
  setArrivalDate({ commit }, date) {
    commit("updateArrivalDate", date);
  },
  setDepartmentDate({ commit }, date) {
    commit("updateDepartmentDate", date);
  },
  clearSelectedStations({ commit }) {
    commit("updateDepartmentStation", null);
    commit("updateArrivalStation", null);
  },
  clearSelectedDates({ commit }) {
    commit("updateArrivalDate", null);
    commit("updateDepartmentDate", null);
  }

};

const mutations = {
  setStations: (state, stations) => {
    state.stations = stations;
  },
  updateDepartmentStation(state, station) {
    state.departmentStation = station;
  },
  updateArrivalStation(state, station) {
    state.arrivalStation = station;
  },
  updateArrivalDate(state, date) {
    state.arrivalDate = date;
  },
  updateDepartmentDate(state, date) {
    state.departmentDate = date;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
