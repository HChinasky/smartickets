import bigInt from "big-integer";
import api from "../../api/api";
import { v4 as uuidv4 } from "uuid";
var Hashes = require("jshashes");
import i18n from "../../i18n"

const state = {
  uuid: "",
  token: "",
  clientInfo: {},
};

const getters = {
  getUUID: (state) => state.uuid,
  getToken: (state) => state.token,
};

const actions = {
  updateClientInfo({ commit }) {
    const clientInfo = {
      appCodeName: navigator.appCodeName,
      appName: navigator.appName,
      appVersion: navigator.appVersion,
      language: navigator.language,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      uuid: localStorage.uuid || uuidv4(),
    };
    commit("setUUID", clientInfo.uuid);
    commit("setClientInfo", clientInfo);
  },
  async regClient({ commit, state }) {
    const GLOBAL_P = bigInt.randBetween("1e50", "9e50");
    const secret_num_client = bigInt.randBetween("100", "999");
    const pClient = bigInt(3).modPow(secret_num_client, GLOBAL_P);

    try {
      let response = await api.registerClient({
        uuid: state.uuid,
        common_p: GLOBAL_P,
        p_client: pClient,
        CUR_TOKEN: state.token,
        client_info: state.clientInfo,
      });

      const token_key = bigInt(response.data.p_server)
        .modPow(secret_num_client, GLOBAL_P)
        .toString();

      var MD5 = new Hashes.MD5();
      var SHA256 = new Hashes.SHA256();

      const token = MD5.hex(
        SHA256.hex(
          state.clientInfo.uuid +
            state.clientInfo.appCodeName +
            state.clientInfo.appName +
            state.clientInfo.appVersion +
            state.clientInfo.language +
            state.clientInfo.platform +
            state.clientInfo.userAgent
        ) + token_key
      );

      if (response.data.code != 0) {
        throw new Error(response.data.msg);
      } else {
        commit("setToken", token);
      }
    } catch (error) { 
      if(error.request) {
        throw new Error(i18n.t("serverNotResponding"));
      } else {      
        throw new Error(error.message)      
      }   
    }
  },
};

const mutations = {
  setUUID(state, uuid) {
    state.uuid = uuid;
    localStorage.setItem("uuid", uuid);
  },
  setClientInfo(state, clientInfo) {
    state.clientInfo = clientInfo;
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
