import Vue from 'vue'
import Vuex from 'vuex'
import Alcohol from './alcohol';
import {alcohols} from './constants'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentAlcohol: alcohols[0],
    volume: alcohols[0].volume,
    amount: 1,
    alcohols : alcohols,
  },
  getters : {
    CURRENT_ALCOHOL: state => {
      return state.currentAlcohol
    },
    ALCOHOLS: state => {
      return state.alcohols
    }
  },
  mutations: {
    SET_CURRENT_ALCOHOL : (state, id) => {
      state.currentAlcohol = state.alcohols.filter(item => item.id == id);
      state.volume = state.currentAlcohol.volume
      state.amount = 1
    },
    ADD_ALCOHOL : (state, name, abv, volume) => {
      const alcohol = new Alcohol(name,abv,volume)
      if (alcohol)
        state.currentAlcohol.push(alcohol)
    },
  },
  actions : {
    SAVE_ALCOHOL : (context, name, abv, volume) => {
      context.commit('ADD_ALCOHOL', name, abv, volume)
    },
    UPDATE_CURRENT_ALCOHOL : (context, id) => {
      context.commit('SET_CURRENT_ALCOHOL', id)
    },
  }  
})