// axiosPlugin.js
import axios from 'axios';
import {useSetupStore} from "@/stores/setupStore.js";

export const axiosPlugin = {
    install: function (app) {

        const setup = useSetupStore()

        const httpClient = axios.create({
            baseURL: setup.host,
            headers: {
                'Content-Type': 'application/json',
            },
        });


        // Set authorization header if needed
        httpClient.interceptors.request.use(config => {

            if (localStorage.getItem('token'))
                config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

            return config;
        });


        // Provide axios instance as global property
        app.config.globalProperties.$server = httpClient;
    },
};