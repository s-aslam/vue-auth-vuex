import { LOGIN, LOGOUT, REGISTER, REMOVE_ERROR } from "./actions";
import { SET_AUTH, PURGE_AUTH, NEW_USER, SET_ERROR } from "./mutation";

export const state = {
  isAuthenticated: false,
  currentUser: {},
  errors: null,
  usersList: []
};

export const getters = {
  isAuthenticated: state => {
    return state.isAuthenticated;
  },
  currentUser: state => {
    return state.currentUser;
  },
  getAllUsers: state => {
    return state.usersList;
  },
  error: state => {
    return state.errors;
  }
};

export const actions = {
  async [LOGIN](context, user) {
    const obj = state.usersList.filter(obj => obj.email === user.email && obj.password === user.password);
    if (obj.length > 0) {
      context.commit(SET_AUTH, obj[0]);
    } else {
      context.commit(SET_ERROR, "Invalid email & password");
    }
  },
  async [REGISTER](context, user) {
    if (state.usersList.some(obj => obj.email === user.email)) {
      context.commit(SET_ERROR, "User already exists");
    } else {
      context.commit(NEW_USER, user);
    }
  },
  async [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  async [REMOVE_ERROR](context) {
    context.commit(SET_ERROR, null);
  }
};

export const mutations = {
  [NEW_USER](state, value) {
    state.usersList.push(value);
    state.errors = null;
  },
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.currentUser = user;
    state.errors = null;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.currentUser = {};
    state.errors = null;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
