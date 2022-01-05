export default {
    setCrediario(state, payload){
        state.crediario = {...payload}
    },
    setCrediarios(state, payload){
        state.crediarios = payload
    },
    setModalExcluirCrediario(state, payload){
        state.modalExcluirCrediario = payload
    },
    setModalValidarCrediario(state, payload){
        state.modalValidarCrediario = payload
    },
    setModalAprovarCrediario(state, payload){
        state.modalAprovarCrediario = payload
    },
    setAnexosCrediario(state, payload){
        state.crediario.anexos = [...payload]
    }
}