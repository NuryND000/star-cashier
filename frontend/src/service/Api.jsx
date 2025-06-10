import axios from 'axios';

// Konfigurasi instance Axios
const api = axios.create({
  baseURL: 'https://star-cashier.myuniv.cloud/api',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true, // Digunakan jika backend mengirimkan cookie seperti Laravel Sanctum
});

// Tambahkan interceptor untuk menangani token secara otomatis
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tangani kesalahan respons
    if (error.response?.status === 401) {
      console.error('Unauthorized! Token mungkin tidak valid atau kedaluwarsa.');
      localStorage.removeItem('token');
      // Redirect ke halaman login jika diperlukan
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;