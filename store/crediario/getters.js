export default {
  getCrediario: (state) => ({ ...state.crediario }),
  getCrediarios: (state) => ({ ...state.crediarios }),
  getModalExcluirCrediario: (state) => state.modalExcluirCrediario,
  getModalValidarCrediario: (state) => state.modalValidarCrediario,
  getModalAprovarCrediario: (state) => state.modalAprovarCrediario,
  getCategoriasProfissionais: (state) => state.categoriasProfissionais,
};
