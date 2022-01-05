import {http} from "./config"

class LoginService  {
   
    login(data){
        return http.post('/login', data)
    }
}

export default new LoginService;