import axios from 'axios';

// Khởi tạo một instance riêng
const api = axios.create({
    baseURL: 'http://localhost:8017', // Thay đổi theo API của bạn
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho Request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // hoặc từ context/store
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho Response
api.interceptors.response.use(
    (response) => {
        // Có thể xử lý response ở đây nếu cần
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                console.warn('Unauthorized - Token có thể hết hạn');
                // redirect to login page hoặc refresh token tại đây
            }
            if (error.response.status === 403) {
                alert('Bạn không có quyền thực hiện hành động này.');
            }
            if (error.response.status === 500) {
                alert('Lỗi server. Vui lòng thử lại sau.');
            }
        }
        return Promise.reject(error);
    }
);

export default api;
