import api from "../../api/api";
import i18n from "../../i18n";

const state = {
  station_from: null,
  station_to: null,
  selected_station: null,  
  isActive: false,
  stations: [],
};

const getters = {
  getMetroStationTo: (state) => state.station_to,
  getMetroStationFrom: (state) => state.station_from,
  getSelectedMetroStation: (state) => state.selected_station,
  getIsMetroActive: (state) => state.isActive,
  getMetroStations: (state) => state.stations,
  getMetroStationById: (state) => (id) => {
    return state.stations.find((station) => station.id == id)?.label;
  },
};

const actions = {
  changeMetroStatus({ commit }, status) {
    commit("SET_METRO_STATUS", status);
  },

  async fetchMetroStations({ rootState, commit }) {
    const params = {
      uuid: rootState.auth.uuid,
    };
    try {
      const response = await api.fetchMetroStations(params);
      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        var stations = response.data.data.map((station) => ({
          id: station.id,
          label: station.name,
          text: station.name,
        }));
        commit("SET_METRO_STATIONS", stations);
      }
    } catch (error) {
      if (error.request) {
        throw new Error(i18n.t("serverNotResponding"));
      } else {
        throw new Error(error.message)
      }
    }
  },

  setMetroStation({ commit, rootState }, station) {
    if (
      rootState.stations.kyivStations.includes(
        rootState.stations.departmentStation
      )
    ) {
      commit("SET_STATION_FROM", station);
      commit("SET_STATION_TO", 15); //Vokzalna
    }

    if (
      rootState.stations.kyivStations.includes(
        rootState.stations.arrivalStation
      )
    ) {
      commit("SET_STATION_TO", station);
      commit("SET_STATION_FROM", 15); //Vokzalna
    }

    commit("SET_SELECTED_STATION", station);
  },
};

const mutations = {
  SET_METRO_STATUS(state, status) {
    state.isActive = status;
  },
  SET_METRO_STATIONS(state, stations) {
    state.stations = stations;
  },
  SET_STATION_FROM(state, station) {
    state.station_from = station;
  },
  SET_STATION_TO(state, station) {
    state.station_to = station;
  },
  SET_SELECTED_STATION(state, station) {
    state.selected_station = station;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
