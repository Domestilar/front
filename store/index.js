export const state = () => ({
  overlay: false,
  user: "",
  token: "",
  urlApi: "http://domestilar.api/api",
  snackbar: {
    text: "",
    color: "",
    status: false,
    timeout: 10000,
  },
});

export const getters = {
  getOverlay: (state) => state.overlay,
  getUser: (state) => state.auth.user,
  getToken: (state) => state.token,
  getUrlApi: (state) => state.urlApi,
  getSnackbar: (state) => state.snackbar,
};

export const mutations = {
  setOverlay(state, payload) {
    state.overlay = payload;
  },
  setUser(state, payload) {
    state.user = { ...payload };
  },
  setToken(state, payload) {
    state.token = payload;
  },
  snackbarError(state, text) {
    state.snackbar.status = true;
    state.snackbar.text = text;
    state.snackbar.color = "error";
  },
  snackbarWarning(state, text) {
    state.snackbar.status = true;
    state.snackbar.text = text;
    state.snackbar.color = "orange darken-2";
  },
  snackbarSuccess(state, text) {
    state.snackbar.status = true;
    state.snackbar.text = text;
    state.snackbar.color = "success";
  },
  snackbarInfo(state, text) {
    state.snackbar.status = true;
    state.snackbar.text = text;
    state.snackbar.color = "info";
  },
  snackbarDisabled(state, status) {
    state.snackbar.status = false;
    state.snackbar.text = "";
    state.snackbar.color = "";
  },
};

export const actions = {
  setOverlay({ commit }, payload) {
    commit("setOverlay", payload);
  },
  snackbarSuccess({ commit }, text) {
    commit("snackbarSuccess", text);
    setTimeout(() => {
      commit("snackbarDisabled");
    }, 10000);
  },
  snackbarError({ commit }, text) {
    commit("snackbarError", text);
    setTimeout(() => {
      commit("snackbarDisabled");
    }, 10000);
  },
  snackbarWarning({ commit }, text) {
    commit("snackbarWarning", text);
    setTimeout(() => {
      commit("snackbarDisabled");
    }, 10000);
  },
  snackbarInfo({ commit }, text) {
    commit("snackbarInfo", text);
    setTimeout(() => {
      commit("snackbarDisabled");
    }, 10000);
  },

  //Type = info, success, error or warning
  alert({}, payload) {
    const title = payload.title ? payload.title : "";
    const message = payload.message ? payload.message : "";
    const icon = payload.icon ? payload.icon : "";
    // this._vm.$swal(title, message, 'success');
  },
};
