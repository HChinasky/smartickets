const getDefaultState = () => {
  return {
    ticketsList: []
  }
}

const state = getDefaultState();

const getters = {
  getTicketsFromCart: (state) => state.ticketsList
};

const actions = {
  setTicketsList ({ commit }, data) {
    commit('updateTicketsList', data)
  },
  resetStateAllCart({ commit }) {
    commit('resetState')
  },
};

const mutations = {
  updateTicketsList(state, tickets) {
    let index = state.ticketsList.map(function(e) { return e.type; }).indexOf(tickets.type);

    if(index === -1) {
      state.ticketsList.push(tickets);
    } else {
      state.ticketsList.splice(index, 1, tickets)
    }
  },
  removeTicketRow(state, type) {
    let removeIndex = state.ticketsList.map(function(item) { return item.type; }).indexOf(type);
    state.ticketsList.splice(removeIndex, 1)
  },
  resetState(state) {
    Object.assign(state, getDefaultState())
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
