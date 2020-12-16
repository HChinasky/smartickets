import axios from "axios";
import i18n from "../i18n";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiClientTest = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  registerClient(params) {
    return apiClient.post(
      "/Client/Register" +
        "?rnd=" +
        (Math.random() * 100000 + "").split(".")[0],
      {
        lng: i18n.locale == "uk" ? "UA" : "EN",
        uuid: params.uuid,
        common_p: params.common_p,
        p_client: params.p_client,
        CUR_TOKEN: params.CUR_TOKEN,
        client_info: params.client_info,
      }
    );
  },

  fetchStations(uuid) {
    return apiClient.post(
      "/ref/get_city" + "?rnd=" + (Math.random() * 100000 + "").split(".")[0],
      {
        lng: i18n.locale == "uk" ? "UA" : "EN",
        uuid: uuid,
      }
    );
  },
  fetchTrains(params) {
    return apiClient.post(
      "/FrontEnd/API/v1/" +
        "?rnd=" +
        (Math.random() * 100000 + "").split(".")[0],
      {
        req_level: "1.1",
        lng: i18n.locale == "uk" ? "UA" : "EN",
        uuid: params.uuid,
        city_from: params.city_from,
        city_to: params.city_to,
        dep_date: params.dep_date,
      }
    );
  },

  fetchMetroStations(params) {
    return apiClient.post("/ref/get_metro", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      cmd: "get_metro",
    });
  },

  fetchTrain(params) {
    return apiClient.post(
      "/FrontEnd/API/v1/" +
        "?rnd=" +
        (Math.random() * 100000 + "").split(".")[0],
      {
        req_level: "1.2",
        lng: i18n.locale == "uk" ? "UA" : "EN",
        uuid: params.uuid,
        city_from: params.city_from,
        city_to: params.city_to,
        dep_date: params.dep_date,
        train_num: params.train_num,
      }
    );
  },

  fetchWagon(params) {
    return apiClient.post(
      "/FrontEnd/API/v1/" +
        "?rnd=" +
        (Math.random() * 100000 + "").split(".")[0],
      {
        req_level: "1.3",
        lng: i18n.locale == "uk" ? "UA" : "EN",
        uuid: params.uuid,
        city_from: params.city_from,
        city_to: params.city_to,
        dep_date: params.dep_date,
        train_num: params.train_num,
        wagon_num: params.wagon_num,
        wagon_type: params.wagon_type,
      }
    );
  },

  bookTickets(params) {
    const request = {
      req_level: params.req_level,
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      city_from: params.city_from,
      city_to: params.city_to,
      arrival_date: params.arrival_date,
      arrival_time: params.arrival_time,
      dep_date: params.dep_date,
      dep_time: params.dep_time,
      train_num: params.train_num,
      wagon_type: params.wagon_type,
      is_split: params.is_split,
      login: params.login,
      password: params.password,
      sign: params.sign,
      passengers: params.passengers,
    };

    if (params.payment_sid) {
      request.payment_sid = params.payment_sid;
    }
    return apiClient.post(
      "/FrontEnd/API/v1/" +
        "?rnd=" +
        (Math.random() * 100000 + "").split(".")[0],
      request
    );
  },
  initPayment(params) {
    return apiClient.post("/Finance/TicketPay", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      payment_sid: params.payment_sid,
      sign: params.sign,
    });
  },

  fetchTickets(params) {
    return apiClient.post("/Tickets/GetTicket", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      payment_sid: params.payment_sid,
      sign: params.sign,
    });
  },

  fetchUserTicket(pack_num, trn_date) {
    return apiClient.post("/Tickets/GetUserTicket", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: "-",
      payment_sid: "-",
      sign: "-",
      pack_num: pack_num,
      trn_date: trn_date
    });
  },

  downloadTicket(params) {
    return apiClient.post("/Tickets/DwnTicket", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      pack_num: params.pack_num,
      trn_date: params.trn_date,
      html: params.html,
    });
  },

  sendTicketToEmail(params) {
    return apiClient.post("/Tickets/DwnTicket", {
      lng: i18n.locale == "uk" ? "UA" : "EN",
      uuid: params.uuid,
      pack_num: params.pack_num,
      trn_date: params.trn_date,
      html: params.html,
      send_mail: true
    });
  },

  validateTicket(params) {
    return apiClient.post("/Tickets/MakeValidate", {
      pin: params.pin,
      OrderNum: params.orderNum,
      date: params.date,
    });
  },
  getRefundInfo(params) {
    return apiClient.post("/Tickets/TicketsListRefund", {
      name: params.name,
      surname: params.surname,
      date: params.date,
      doc_num: params.doc_num,
    });
  },
  makeRefund(token) {
    return apiClient.post("/Tickets/EndRefund", {
      refund_token: token,
    });
  },

  downloadRefundReceipt(doc_num) {
    return apiClient.post("/Tickets/DwnRefund", {
      doc_num: doc_num,
    });
  },

  fetchAircrafts(params) {
    return apiClientTest.post(
      "flights/search/",
      {
              "type": "SkyUp",
              "payment_sid": params.payment_sid,
              "adt": params.adult,
              "chd": params.child,
              "inf": params.inf,
              "departure": params.city_from,
              "arrival": params.city_to,
              "date": params.dep_date,
              ...(params.arr_date && {"dateback": params.arr_date})
            }
    );
  },

  fetchCity() {
    return apiClientTest.post(
      "reference/city",
      {
        "value": "all",
        "type": "SkyUp",
        "lng": i18n.locale == "uk" ? "UA" : "EN",
      })
  },

  fetchAirports() {
    return apiClientTest.post(
      "reference/airport",
      {
        "value": "all",
        "type": "SkyUp",
        "lng": i18n.locale == "uk" ? "UA" : "EN",
      })
  },

  bookingTicketAircraft(params) {
    return apiClientTest.post(
      "flights/book",
      params
    )
  },

  getPrice(params) {
    return apiClientTest.post(
      "flights/get-price",
      params
    )
  }
};
