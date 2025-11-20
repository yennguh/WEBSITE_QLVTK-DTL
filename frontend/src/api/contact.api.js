import api from './axiosInterceptor';

export const sendContact = async (payload) => {
    try {
        const response = await api.post('/v1/contact', payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi gửi liên hệ:", error.response?.data || error.message);
        throw error;
    }
};

export const fetchContacts = async (params = {}) => {
    try {
        const response = await api.get('/v1/contact', { params });
        return response.data;
    } catch (error) {
        console.error("Lỗi lấy danh sách liên hệ:", error.response?.data || error.message);
        return null;
    }
};

export const updateContact = async (id, payload) => {
    try {
        const response = await api.put(`/v1/contact/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error("Lỗi cập nhật liên hệ:", error.response?.data || error.message);
        throw error;
    }
};

