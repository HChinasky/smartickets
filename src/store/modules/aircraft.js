import "moment/locale/uk";
import moment from "moment";
import api from "../../api/api";

export const dataStore = {
  state: {
    data: [],
  },
};

const state = {
  aircrafts: [],
  aircraft: {},
  adult: null,
  teenagers: null,
  kids: null
};


const getters = {
  allAircrafts: (state) => state.aircrafts,
  getAircraft: (state) => state.aircraft,
  getAircraftByNumber: (state) => (number) => {
    return state.aircrafts.find((aircraft) => aircraft.number === number);
  },
  getAdult: (state) => state.adult,
  getTeenagers: (state) => state.teenagers,
  getKids: (state) => state.kids
};

const actions = {
  async fetchAircrafts({ rootState, commit }) {
    //const { token } = rootState.auth
    const params = {
      city_from: rootState.cities.departmentCityCode,
      city_to: rootState.cities.arrivalCityCode,
      dep_date: moment(rootState.cities.cityDepartmentDate).format("DD-MM-YYYY"),
      arr_date: rootState.cities.cityArrivalDate ? moment(rootState.cities.cityArrivalDate).format("DD-MM-YYYY") : null,
      adult: rootState.aircraft.adult,
      child: rootState.aircraft.teenagers,
      inf: rootState.aircraft.kids
    };

    const response = await api.fetchAircrafts(params);

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      commit("updateAircrafts", response.data.data);
    }
  },

  setAdult({ commit }, data) {
    commit("updateAdult", data);
  },

  setTeenagers({ commit }, data) {
    commit("updateTeenagers", data);
  },

  setKids({ commit }, data) {
    commit("updateKids", data);
  },
};

const mutations = {
  updateAircrafts(state, aircrafts) {
    state.aircrafts = aircrafts;
  },
  updateAircraft(state, aircraft) {
    state.aircraft = aircraft;
  },
  updateAdult(state, adult) {
    state.adult = adult;
  },
  updateTeenagers(state, teenager) {
    state.teenagers = teenager;
  },
  updateKids(state, kids) {
    state.kids = kids;
  },


};

export default {
  state,
  getters,
  actions,
  mutations,
};
