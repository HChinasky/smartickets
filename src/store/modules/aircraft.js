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
      city_from: rootState.airports.departmentCityCode,
      city_to: rootState.airports.arrivalCityCode,
      dep_date: moment(rootState.airports.cityDepartmentDate).format("DD-MM-YYYY"),
      arr_date: rootState.airports.cityArrivalDate ? moment(rootState.airports.cityArrivalDate).format("DD-MM-YYYY") : null,
      adult: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "ADT").length,
      child: rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "CHD").length,
      inf:rootState.cartAircraft.passengers.filter((passenger) => passenger.type === "INF").length
    };

    const response = await api.fetchAircrafts(params);
    if (response.data.data.flights.length !== 0) {
      commit("updateAircrafts", response.data.data);
      console.log(response.data.data)
      let flight = {
        departmentFlight: [],
        arrivalFlight: []
      }

      for (var i = 0; i < response.data.data.flights.length; i++) {
        for (var k = 0; k < response.data.data.flights[i].routes.length; k++) {
          if (response.data.data.flights[i].routes[k].backward === 1) {
            flight.arrivalFlight.push(response.data.data.flights[i].routes[k]);
            flight.arrivalFlight[i]["amount"] = response.data.data.flights[i].amount.UAH.toFixed(2);
            flight.arrivalFlight[i]["resultId"] = response.data.data.flights[i].resultId;
            flight.arrivalFlight[i]["searchId"] = response.data.data.flights[i].searchId;
          } else {
            flight.departmentFlight.push(response.data.data.flights[i].routes[k]);
            flight.departmentFlight[i]["amount"] = response.data.data.flights[i].amount.UAH.toFixed(2);
            flight.departmentFlight[i]["resultId"] = response.data.data.flights[i].resultId;
            flight.departmentFlight[i]["searchId"] = response.data.data.flights[i].searchId;
          }
        }
      }
      return flight;
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
