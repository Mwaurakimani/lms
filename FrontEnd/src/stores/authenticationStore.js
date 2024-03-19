import {defineStore} from "pinia";
import {useServer} from "@/composables/server.js";
import router from "@/router/index.js";

export const useAuthenticationStore = defineStore('useAuthenticationStore', {
    state: () => ({
        token: null,
        user: null
    }),
    getters: {
        is_authenticated: (state) => {
            let token = localStorage.getItem('token') ?? null
            let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

            if (token && user) {
                state.user = user
                state.token = token
            }

            return !!(state.token && state.user)
        },
        accountType: (state) => {
            return state.is_authenticated ? state.user.accountType : null
        }
    },
    actions: {
        async logOut(server){
            await server.post('/api/logout')
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            return true
        },
        async a_is_Authenticated(server = null){
            try {
                await this.authenticationConfirmed(server);
                return true
            } catch (error) {
                console.error('Authentication failed:', error);
                return false;
            }
        },
        async authenticationConfirmed(server = null){
            try {
                await server.get('/api/user');
            } catch (error) {
                console.error('Invalid token:', error.response.data);
                router.push({})
                localStorage.clear();
            }
        }
    }
})