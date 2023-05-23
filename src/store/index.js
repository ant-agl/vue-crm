import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import category from "./category";
import record from "./record";

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: (s) => s.error,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async fetchCurrency() {
      let res = await fetch("https://www.cbr-xml-daily.ru/latest.js");
      if (res.ok) {
        let rates = (await res.json()).rates;
        rates.RUB = 1;
        return rates;
      } else {
        return {
          RUB: 1,
          USD: 0.012420925,
          EUR: 0.0113159,
        };
      }
    },
  },
  modules: {
    auth,
    info,
    category,
    record,
  },
});
