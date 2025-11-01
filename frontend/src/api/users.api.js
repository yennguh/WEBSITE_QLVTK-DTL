import api from './axiosInterceptor';
import { API_ROOT } from '../utils/constant';
export const fetchLoginAPI = async (payload) => {
   const request = await api.post(API_ROOT + `/v1/user/login`, payload)
   return request.data;
}
