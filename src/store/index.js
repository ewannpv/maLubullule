import Vue from 'vue';
import Vuex from 'vuex';
import Alcohol from './alcohol';
import { alcohols, categories } from './constants';
import Stats from './stats';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentAlcohol: alcohols[0],
    volume: alcohols[0].volume,
    alcohols,
    categories,
    stats: null,
  },
  getters: {
    CURRENT_ALCOHOL: (state) => state.currentAlcohol,
    ALCOHOLS: (state) => state.alcohols,
    CATEGORIES: (state) => state.categories,
    STATS: (state) => state.stats,
  },
  mutations: {
    SET_CURRENT_ALCOHOL: (state, id) => {
      const newAlcohol = state.alcohols.filter((item) => item.id === id)[0];
      if (!newAlcohol) return;

      state.currentAlcohol = newAlcohol;
      state.volume = state.currentAlcohol.volume;
    },
    ADD_ALCOHOL: (state, { name, abv, volume }) => {
      const alcohol = new Alcohol(name, abv, volume);
      if (alcohol) state.currentAlcohol.push(alcohol);
    },
    CALCULATE_STATS: (state, { volume, weight, sex }) => {
      const stats = new Stats(state.currentAlcohol, volume, weight, sex);
      if (stats) state.stats = stats;
    },
  },
  actions: {
    SAVE_ALCOHOL: (context, { name, abv, volume }) => {
      context.commit('ADD_ALCOHOL', name, abv, volume);
    },
    UPDATE_CURRENT_ALCOHOL: (context, id) => {
      context.commit('SET_CURRENT_ALCOHOL', id);
    },
    UPDATE_STATS: (context, { volume, weight, sex }) => {
      context.commit('CALCULATE_STATS', {
        volume, weight, sex,
      });
    },
  },
});
