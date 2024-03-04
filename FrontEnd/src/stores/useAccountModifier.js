import {defineStore} from "pinia";


export const useAccountModifier = defineStore('useAccountModifierStore',{
    state:() => ({
        accountType : null
    }),

    getters:{
        getAccountType(state){
            return state.accountType
        }
    },
    actions:{
        setAccountType(accountType){
            this.accountType = accountType
        }
    }
})