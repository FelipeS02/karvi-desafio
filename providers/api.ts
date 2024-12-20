import axios from 'axios';

const api = axios.create();

api.interceptors.response.use((res: any) => res?.data);

export default api;
