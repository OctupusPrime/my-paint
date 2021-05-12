import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  paintArr: JSON.parse(localStorage.getItem('paintArr')) || []
}

const mutations = {
    setNewLine(state, payload) {
        state.paintArr.push(payload);
        localStorage.setItem('paintArr', JSON.stringify(state.paintArr));
    },
    clearPaint(state) {
        state.paintArr = [];
        localStorage.removeItem('paintArr');       
    }
}

const actions = {
    setNewLine({commit}, newLine) {
        commit('setNewLine', newLine)
    },
    clearPaint({commit}) {
        commit('clearPaint')   
    }
}

const getters = {
    getPaintArr(state) {
        return state.paintArr;
    }  
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})