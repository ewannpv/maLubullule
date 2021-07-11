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
    SET_CURRENT_ALCOHOL : (state, index) => {
      state.currentAlcohol = state.alcohols[index]
      state.volume = state.currentAlcohol.volume
      state.amount = 1
    },
    ADD_ALCOHOL : (state, name, strength, volume) => {
      const alcohol = new Alcohol(name,strength,volume)
      if (alcohol)
        state.currentAlcohol.push(alcohol)
    },
  },
  actions : {
    SAVE_ALCOHOL : (context, name, strength, volume) => {
      context.commit('ADD_ALCOHOL', name, strength, volume)
    },
    UPDATE_CURRENT_ALCOHOL : (context, index) => {
      context.commit('SET_CURRENT_ALCOHOL', index)
    },
  }  
})