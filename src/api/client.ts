import axios from 'axios';

export const client = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const response = error.response;
    if (response) {
      return Promise.reject({
        message: response.data.message || 'Ocurrió un error',
        type: response.data.type || 'error',
        status: response.status,
        data: response.data.data || {},
      });
    }
    return Promise.reject({
      message: 'Hay un error de red',
      type: 'error',
      data: {},
    });
  },
);

export const setAuthorizationHeader = (token: string) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};
