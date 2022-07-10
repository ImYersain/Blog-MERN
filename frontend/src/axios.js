import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7777'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token'); //при любом запросе, проверяем в локал сторадже токен и если он есть , то отправляем вместе с запросом
    return config;
})

export default instance;    
