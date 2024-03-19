import {getCurrentInstance} from 'vue'
import axios from "axios";
import {useSetupStore} from "@/stores/setupStore.js";

export function useServer() {
    const app = getCurrentInstance()

    if (app) {
        return app.appContext.config.globalProperties.$server
    }else {
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

        return httpClient
    }
}