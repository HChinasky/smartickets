import moment from "moment";
import "moment/locale/uk";
import orderBy from "lodash/orderBy";
import filter from "lodash/filter";
import api from "../../api/api";
import i18n from "../../i18n";

export const dataStore = {
  state: {
    data: [],
  },
};

const state = {
  trains: [],
  train: {},
  wagon: {},
  selectedTab: null,
  isDevLoginRequired: true,
};

const getters = {
  allTrains: (state) => {
    /*скрытие пригородных поездов из результатов поиска*/
    return filter(
      state.trains,
      (obj) =>
        !obj.places.wagons.find((wagon) => {
          if (wagon.type.class) {
            return wagon.type.class == 3;
          }
        })
    );
  },
  getTrain: (state) => state.train,
  getTrainByNumber: (state) => (number) => {
    return state.trains.find((train) => train.number === number);
  },
  getWagons: (state) => state.train.wagons,
  getIsDevLoginRequired: (state) => state.isDevLoginRequired,
  getWagonsByType: (state) => (type) => {
    if (type == "С1") {
      return orderBy(
        filter(
          state.train.wagons,
          (obj) => obj.type.code == "С" && obj.class.code == "1"
        ),
        function(o) {
          return new Number(o.number);
        },
        ["asc"]
      );
    } else if (type == "С2") {
      return orderBy(
        filter(
          state.train.wagons,
          (obj) => obj.type.code == "С" && obj.class.code == "2"
        ),
        function(o) {
          return new Number(o.number);
        },
        ["asc"]
      );
    } else if (type == "С3") {
      return orderBy(
        filter(
          state.train.wagons,
          (obj) => obj.type.code == "С" && obj.class.code == "3"
        ),
        function(o) {
          return new Number(o.number);
        },
        ["asc"]
      );
    } else {
      return orderBy(
        filter(state.train.wagons, ["type.code", type]),
        function(o) {
          return new Number(o.number);
        },
        ["asc"]
      );
    }
  },
  getWagon: (state) => state.wagon,
  getWagonByNumber: (state) => (number) => {
    return state.train.wagons.find((wagon) => wagon.number == number);
  },
  getSelectedTab: (state) => state.selectedTab,
};

const actions = {
  async fetchTrains({ rootState, commit }) {
    //const { token } = rootState.auth
    const params = {
      city_from: rootState.stations.departmentStation,
      city_to: rootState.stations.arrivalStation,
      dep_date: moment(rootState.stations.departmentDate).format("YYYY-MM-DD"),
      uuid: rootState.auth.uuid,
    };

    const response = await api.fetchTrains(params);
    if (response.data.code != 0) {
      throw new Error(response.data.msg);
    } else {
      commit("updateTrains", response.data.data.response.transaction.trains);
    }
  },

  async fetchTrain({ rootState, commit }, train_num) {
    const params = {
      city_from: rootState.stations.departmentStation,
      city_to: rootState.stations.arrivalStation,
      dep_date: moment(rootState.stations.departmentDate).format("YYYY-MM-DD"),
      train_num: train_num,
      uuid: rootState.auth.uuid,
    };

    try {
      const response = await api.fetchTrain(params);
      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        commit("updateTrain", response.data.data.response.transaction.train);
        return response;
      }
    } catch (error) {
      if (error.request) {
        throw new Error(i18n.t("serverNotResponding"));
      } else {
        throw new Error(error.message);
      }
    }
  },
  async fetchWagon({ rootState, commit }, payload) {
    try {
      const response = await api.fetchWagon({
        city_from: rootState.stations.departmentStation,
        city_to: rootState.stations.arrivalStation,
        
        dep_date: moment(rootState.stations.departmentDate).format(
          "YYYY-MM-DD"
        ),
        train_num: payload.train_num,
        wagon_num: payload.wagon_num,
        wagon_type: payload.wagon_type.includes("С") ? "С" : payload.wagon_type,
        uuid: rootState.auth.uuid,
      });
      const wagon = response.data.data.response.transaction.train.wagons[0];
      commit("updateWagon", wagon);
      commit("SET_DEV_LOGIN_REQUIRED", response.data.need_auth);
      return response;
    } catch (error) {
      if (error.request) {
        throw new Error(i18n.t("serverNotResponding"));
      } else {
        throw new Error(error.message);
      }
    }
  },
  clearSelectedTrains({ commit }) {    
    commit("updateTrains", []);
  },

  updateSelectedTab({ commit }, selectedTab) {
    commit("SET_SELECTED_TAB", selectedTab);
  },
  updateIsDevLoginRequired({ commit }, isDevLoginRequired) {
    commit("SET_DEV_LOGIN_REQUIRED", isDevLoginRequired);
  },
};

const mutations = {
  updateTrains(state, trains) {
    state.trains = trains;
  },
  updateTrain(state, train) {
    state.train = train;
  },

  updateWagon(state, wagon) {
    state.wagon = wagon;
  },

  SET_SELECTED_TAB(state, selectedTab) {
    state.selectedTab = selectedTab;
  },
  SET_DEV_LOGIN_REQUIRED(state, isRequired) {
    state.isDevLoginRequired = isRequired;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
