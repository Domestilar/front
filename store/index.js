export const state = () => ({
  overlay: false,
  user: "",
  token: "",
  urlApi: 'http://domestilar.api/api',
  snackbar: {
    text: "",
    color: "",
    status: false,
    timeout: 6000,
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
  setToken(state, payload){
    state.token = payload
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

  //Type = info, success, error or warning
  alert({}, payload) {
    const title = payload.title ? payload.title : "";
    const message = payload.message ? payload.message : "";
    const icon = payload.icon ? payload.icon : "";
    // this._vm.$swal(title, message, 'success');
  },
};
