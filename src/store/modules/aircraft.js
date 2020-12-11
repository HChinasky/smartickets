import "moment/locale/uk";
import moment from "moment";
import api from "../../api/api";
import i18n from "../../i18n";

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
    console.log(response.data.data.flights.length)
    if (response.data.data.flights.length !== 0) {
      commit("updateAircrafts", response.data.data);
    } else {
      throw new Error(i18n.t("noFlight"));
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
