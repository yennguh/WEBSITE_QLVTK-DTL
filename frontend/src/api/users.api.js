import { API_ROOT } from '../utils/constant';
import api from './axiosInterceptor';
export const fetchLoginAPI = async (payload) => {
   const request = await api.post(API_ROOT + `/v1/user/login`, payload)
   return request.data;
}

export const fetchRegisterAPI = async (payload) => {
   try {
      const response = await api.post(`${API_ROOT}/v1/user/register`, payload);
      return response.data;
   } catch (error) {
      console.error("Lỗi đăng ký:", error.response?.data || error.message);
      return null;
   }
};
export const inforUser = async () => {
   try {
      const response = await api.get(`${API_ROOT}/v1/user/inforUser`);
      return response.data;
   } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error.response?.data || error.message);
      return null;
   }
};
