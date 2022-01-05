import BaseService from '~/services/BaseService';
import {http} from "./config"

class CrediarioService extends BaseService {
    constructor(){
        super('/crediarios')
    }
    salvar(data){
        return http.post('/crediario', data);
    }
    completar(data){
        return http.post(`/crediario/${data.uuid}/completar-cadastro`)
    }
    validar(data){
        return http.post(`/crediario/${data.get('uuid')}/validar`, data)
    }
    aprovar(data){
        return http.post(`/crediario/${data.id}/aprovar`, data)
    }

}

export default new CrediarioService;