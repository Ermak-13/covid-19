import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { active } from '@/utils.js'

export default new Vuex.Store({
  state: {
    isReady: false,
    covid19Data: {},
  },

  getters: {
    countries: (state) => {
      return Object.keys(state.covid19Data);
    },

    getCovid19DataByCountry: (state) => (country) => {
      return state.covid19Data[country];
    },

    covid19DataWorld: (state, getters) => {
      return getters.getCovid19DataByCountries(Object.keys(state.covid19Data));
    },

    getCovid19DataByCountries: (state) => (countries) => {
      const result = [];
      countries.forEach((country) => {
        const dataByCountry = state.covid19Data[country];
        dataByCountry.forEach((dayData, i) => {
          if (result[i]) {
            result[i] = {
              confirmed: result[i].confirmed + dayData.confirmed,
              deaths: result[i].deaths + dayData.deaths,
              recovered: result[i].recovered + dayData.recovered,
              active: result[i].active + dayData.active,
              date: dayData.date
            };
          } else {
            result[i] = dayData;
          }
        });
      });

      return result;
    }
  },

  mutations: {
    setCovid19Data (state, data) {
      state.covid19Data = data;
      state.isReady = true;
    }
  },

  actions: {
    loadCovid19Data ({ commit }) {
      fetch('https://pomber.github.io/covid19/timeseries.json')
      .then(response => response.json())
      .then(data => {
        const preparedData = {}
        Object.entries(data).forEach(([country, countryData]) => {
          preparedData[country] = countryData.map((dayData) => {
            return {
              ...dayData,
              active: active(dayData),
              date: new Date(dayData.date)
            }
          })
        });

        commit('setCovid19Data', preparedData);
      });
    }
  },

  modules: {}
})
