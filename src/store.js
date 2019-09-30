import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    INIT_APP(state, tasks) {
      state.tasks = [...tasks];
    },
  },
  actions: {
    createTask({ commit }, task) {
      commit('ADD_TASK', task);
    },
    init({ commit }) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      commit('INIT_APP', tasks);
    },
  },
  getters: {
    getTaskById: state => id => state.tasks.find(task => task.id === id),
  },
});
