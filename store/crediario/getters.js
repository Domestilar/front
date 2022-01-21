export default {
  getCrediario: (state) => ({ ...state.crediario }),
  getCrediarios: (state) => ({ ...state.crediarios }),
  getModalExcluirCrediario: (state) => state.modalExcluirCrediario,
  getModalValidarCrediario: (state) => state.modalValidarCrediario,
  getModalAprovarCrediario: (state) => state.modalAprovarCrediario,
  getModalRejeitarCrediario: (state) => state.modalRejeitarCrediario,
  getCategoriasProfissionais: (state) => state.categoriasProfissionais,
};
