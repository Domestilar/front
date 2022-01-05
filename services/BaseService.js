import { http } from './config'

class BaseService {
    constructor(url) {
        this.url = url;
    }

    listar(){
        return http.get(this.url)
    }

    salvar(data){
        return http.post(this.url, data)
    }

    editar(id){
        return http.get(`${this.url}/${id}`)
    }

    atualizar(data){
        return http.put(`${this.url}/${data.id}`, data)
    }

    excluir(id){
        return http.delete(`${this.url}/${id}`)
    }

}

export default BaseService