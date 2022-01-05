import CrediarioService from "@/services/CrediarioService";

export default {
  cadastrarCrediario({ commit, dispatch }) {
    commit("setCrediario", {
      id: "",
      nome: "",
      cpf_cnpj: "",
      rg: "",
      orgao_emissor_rg: "",
      data_emissao_rg: "",
      estado_civil: "",
      nome_conjuge: "",
      email: "",
      data_nascimento: "",
      telefone: "",
      celular: "",
      foto_selfie_url: "",
      categoria_profissional: "",
      profissao: "",
      sexo: "",
      nome_pai: "",
      nome_mae: "",
      escolaridade: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      estado: "",
      tipo_residencia: "",
      tipo_comprovante_residencia: "",
      comprovante_residencia_url: "",
      nome_empresa: "",
      logradouro_empresa: "",
      numero_empresa: "",
      complemento_empresa: "",
      bairro_empresa: "",
      cidade_empresa: "",
      cep_empresa: "",
      estado_empresa: "",
      telefone_empresa: "",
      celular_empresa: "",
      email_empresa: "",
      cnpj_empresa: "",
      natureza_ocupacao_empresa: "",
      tipo_comprovante_renda_empresa: "",
      comprovante_renda_url_empresa: "",
      data_admissao_empresa: "",
    });
  },
  listarCrediario({ commit, dispatch }, data) {
    const queryParams = `limit=${data.limit ? data.limit : 10}
      ${data.page ? "&page=" + data.page : 1}
      ${data.nome ? "&nome=" + data.nome : ""}
      ${data.cpf_cnpj ? "&cpf_cnpj=" + data.cpf_cnpj : ""}
      ${data.status ? "&status=" + data.status : ""}
      ${data.created_at ? "&created_at=" + data.created_at : ""}
    `;

    this.$axios
      .get(`/crediarios?${queryParams}`)
      .then((res) => {
        commit("setCrediarios", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  salvarCrediario({ commit, dispatch }, data) {
    commit("setOverlay", true, { root: true });
    this.$axios
      .post("/crediario", data)
      .then((res) => {
        commit("setOverlay", false, { root: true });
        // dispatch("alert", {
        //   type: "success",
        //   message: "Solicitação enviada com sucesso.",
        // });
        this.$router.push('/confirmacao')
      })
      .catch((e) => {
        dispatch(
          "alert",
          {
            type: "error",
            message: "Erro ao efetuar enviar solicitação.",
          },
          { root: true }
        );
        commit("setOverlay", false, { root: true });
        console.log(e);
      });
  },
  visualizarCrediario({ commit, dispatch }, id) {
    this.$axios
      .get(`/crediarios/${id}`)
      .then((res) => {
        commit("setCrediario", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  atualizarCrediario({ commit, dispatch }, data) {
    commit("setOverlay", true, { root: true });
    this.$axios
      .put(`/crediarios/${data.id}`, data)
      .then((res) => {
        commit("setOverlay", false, { root: true });
        commit("snackbarSuccess", "Registro atualizado", { root: true });
      })
      .catch((e) => {
        commit("setOverlay", false, { root: true });
        console.log(e);
      });
  },
  completarCrediario({ commit, dispatch }, data) {
    commit('setOverlay', true, {root: true})
    this.$axios
      .post(`/crediario/${data.get('uuid')}/completar-cadastro`, data)
      .then((res) => {
        console.log('completar', res.data);
        this.$router.push('/confirmacao')
        commit('setOverlay', false, {root: true})
      })
      .catch((e) => {
        commit('setOverlay', false, {root: true})
        console.log(e);
      });
  },
  validarCrediario({ commit, dispatch, getters }, id) {
    commit("setOverlay", true, { root: true });
    this.$axios
      .post(`/crediario/${id}/validar`)
      .then((res) => {
        commit("setCrediario", {
          ...getters.getCrediario,
          status: res.data.status,
        });
        dispatch("setModalValidarCrediario", false);
        commit("setOverlay", false, { root: true });
        commit("snackbarSuccess", "Cadastro validado com sucesso.", {root: true});
      })
      .catch((e) => {
        commit("setOverlay", false, { root: true });
        commit("snackbarError", "Erro ao validar cadastro.", { root: true });
        console.log(e);
      });
  },
  async aprovarCrediario({ commit, dispatch, getters }, id) {
    commit("setOverlay", true, { root: true });
    const crediario = {...getters.getCrediario}
    await this.$axios
      .post(`/crediario/${id}/aprovar`)
      .then((res) => {
        commit("setCrediario", {
          ...crediario,
          status: res.data.status,
        });
        commit("setOverlay", false, { root: true });
        dispatch("setModalAprovarCrediario", false);
        commit("snackbarSuccess", "Cadastro aprovado com sucesso.", {
          root: true,
        });
      })
      .catch((e) => {
        commit("setOverlay", false, { root: true });
        commit("snackbarError", "Erro ao aprovar cadastro.", { root: true });

        console.log(e);
      });
  },
  excluirCrediario({ commit, dispatch }, data) {
    this.$axios
      .delete(`/crediarios/data.id`)
      .then((res) => {
        commit("snackbarError", "Registro excluído.", { root: true });
        dispatch("listarCrediario");
      })
      .catch((e) => {
        console.log(e);
        commit("snackbarError", "Erro ao excluir registro.", { root: true });
      });
  },
  setModalValidarCrediario({ commit }, status) {
    commit("setModalValidarCrediario", false);
    setTimeout(() => {
      commit("setModalValidarCrediario", status);
    }, 100);
  },
  setModalAprovarCrediario({ commit }, status) {
    commit("setModalAprovarCrediario", false);
    setTimeout(() => {
      commit("setModalAprovarCrediario", status);
    }, 100);
  },
};
