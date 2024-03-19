import {defineStore} from "pinia";

const defaultState = {
    url: "http://127.0.0.1", port: "8001"
}
export const useSetupStore = defineStore('useSetupStore', {
    state: () => ({...defaultState}), getters: {
        host: (state) => state.url + ":" + state.port
    },
})