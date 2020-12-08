const config = {  
  apiBaseUrl: parse(
    process.env.VUE_APP_API_BASE_URL,
    "https://st-bknd.e-transport.gov.ua"
  ),
  downloadReceiptUrl: parse(
    process.env.VUE_APP_RECEIPT_DOWNLOAD_URL,
    "https://dev.pay.gov.ua/check_dwn?payment_no="
  ),  
  services: {
    cost: {
      bedding: 50,
      oneDrink: 10,
      twoDrinks: 20,
      metroTicket: 8,
    },
  },
  siteOnMaintenance: false
};

function parse(value, fallback) {
  if (typeof value === "undefined") {
    return fallback;
  }
  switch (typeof fallback) {
    case "boolean":
      return !!JSON.parse(value);
    case "number":
      return JSON.parse(value);
    default:
      return value;
  }
}
export { config };
export default {
  install(Vue) {
    Vue.appConfig = config;
    Vue.prototype.$appConfig = config;
  },
};
