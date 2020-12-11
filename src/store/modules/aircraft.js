import "moment/locale/uk";
import moment from "moment";
import api from "../../api/api";

const state = {
  aircrafts: [],
  aircraft: {},
};

const getters = {
  allAircrafts: (state) => state.aircrafts,
};

const actions = {
  async fetchAircrafts({ rootState, commit }) {
    //const { token } = rootState.auth
    const params = {
      city_from: rootState.cities.departmentCityCode,
      city_to: rootState.cities.arrivalCityCode,
      dep_date: moment(rootState.cities.cityDepartmentDate).format("DD-MM-YYYY"),
      arr_date: rootState.cities.cityArrivalDate ? moment(rootState.cities.cityArrivalDate).format("DD-MM-YYYY") : null,
      adult: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "ADT").length,
      child: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "CHD").length,
      inf:rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "INF").length
    };
    // getAircraftByNumber: (state) => () => {
    //   return state.cartAircraft.passengers((aircraft) => aircraft.number === number);
    // },
    const response = await api.fetchAircrafts(params);

    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      commit("updateAircrafts", response.data.data);
    }
  },
};

const mutations = {
  updateAircrafts(state, aircrafts) {
    state.aircrafts = aircrafts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
