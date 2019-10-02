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
    EDIT_TASK(state, editedTask) {
      state.tasks = state.tasks.map(task => (task.id === editedTask.id ? editedTask : task));
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    REMOVE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    UPDATE_TASK(state, edited) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === edited.id) {
          const taskWithNewStatus = Object.assign(task, { status: edited.status });
          return taskWithNewStatus;
        }
        return task;
      });

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
    changeTask({ commit }, task) {
      commit('EDIT_TASK', task);
    },
    removeTask({ commit }, taskId) {
      commit('REMOVE_TASK', taskId);
    },
    updateTask({ commit }, edited) {
      commit('UPDATE_TASK', edited);
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
