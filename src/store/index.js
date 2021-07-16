import Vue from 'vue';
import Vuex from 'vuex';
import Alcohol from './alcohol';
import { FetchAlcohols, FetchCategories } from './api';
import Stats from './stats';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Alcohol used to store the selected alcohol.
    currentAlcohol: null,
    // Float that stores the volume of one dose.
    volume: null,
    // [Alcohol] used to store fetched alcohols.
    alcohols: null,
    // [Category] used to store fetched categories.
    categories: [],
    // Stats that stores informations to display.
    stats: null,

    // Booleans used to know when datas have been feteched.
    alcoholsFetched: false,
    categoriesFetched: false,

    // Setttings
    settings: {
      // BOolean used to know if a custom bored should be displayed.
      customBorder: false,
    },
  },
  // Getters to retreive state.
  getters: {
    CURRENT_ALCOHOL: (state) => state.currentAlcohol,
    ALCOHOLS: (state) => state.alcohols,
    CATEGORIES: (state) => state.categories,
    STATS: (state) => state.stats,
    DATAFETCHED: (state) => state.alcoholsFetched && state.categoriesFetched,
    SETTINGS: (state) => state.settings,
  },
  // Mutations of state called by actions.
  mutations: {
    SET_CATEGORIES: (state, fetchedCategories) => {
      state.categories = fetchedCategories;
      state.categoriesFetched = true;
    },
    SET_ALCOHOLS: (state, fetchedAlcohols) => {
      state.alcohols = fetchedAlcohols;
      state.currentAlcohol = [fetchedAlcohols];
      state.volume = state.currentAlcohol.volume;
      state.alcoholsFetched = true;
    },
    SET_CURRENT_ALCOHOL: (state, id) => {
      const newAlcohol = state.alcohols.filter((item) => item.id === id)[0];
      if (!newAlcohol) return;

      state.currentAlcohol = newAlcohol;
      state.volume = state.currentAlcohol.volume;
    },
    SET_CUSTOM_ALCOHOL: (state, abv) => {
      const newAlcohol = new Alcohol('custom', abv, 5, ['custom']);

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
  // Actions called by components.
  actions: {
    FETCH_CATEGORIES: (context) => {
      FetchCategories(context);
    },
    FETCH_ALCOHOLS: (context) => {
      FetchAlcohols(context);
    },
    SAVE_ALCOHOL: (context, { name, abv, volume }) => {
      context.commit('ADD_ALCOHOL', name, abv, volume);
    },
    UPDATE_CURRENT_ALCOHOL: (context, id) => {
      context.commit('SET_CURRENT_ALCOHOL', id);
    },
    UPDATE_CUSTOM_ALCOHOL: (context, abv) => {
      context.commit('SET_CUSTOM_ALCOHOL', abv);
    },
    UPDATE_STATS: (context, { volume, weight, sex }) => {
      context.commit('CALCULATE_STATS', {
        volume,
        weight,
        sex,
      });
    },
  },
});
