import axios from 'axios'
import {getters} from '../store/index'
export const http = axios.create({
    // baseURL: 'https://api-esic.msbtec.com.br/api',
    baseURL: 'http://domestilar.api/api',
    
});