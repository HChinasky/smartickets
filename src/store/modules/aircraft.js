import "moment/locale/uk";
import moment from "moment";
import api from "../../api/api";
import i18n from "../../i18n";

const state = {
  aircrafts: [],
};

const getters = {
  allAircrafts: (state) => state.aircrafts,
};

const actions = {
  async fetchAircrafts({ rootState, commit }) {
    //const { token } = rootState.auth
    const params = {
      payment_sid: rootState.airports.payment_sid,
      city_from: rootState.airports.departmentMainCityCode,
      city_to: rootState.airports.arrivalMainCityCode,
      dep_date: moment(rootState.airports.cityDepartmentDate).format("DD-MM-YYYY"),
      arr_date: rootState.airports.cityArrivalDate ? moment(rootState.airports.cityArrivalDate).format("DD-MM-YYYY") : null,
      adult: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "ADT").length,
      child: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "CHD").length,
      inf:rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "INF").length
    };
    const response = await api.fetchAircrafts(params);
    console.log(response.data.data)
    if (response.data.data.flights.length !== 0 || response.data.data.additional_flights.length !== 0) {
      commit("updateAircrafts", response.data.data);
    } else {
      commit("clearAircrafts");
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
