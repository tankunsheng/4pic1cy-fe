import { reactive, toRefs } from "vue"

const state = reactive({
    user: {},
    authInfo: ""
})
export default function userUsers() {
    const setUser = (googleUser, authInfo) =>{
        state.user = googleUser,
        state.authInfo = authInfo
    }
    return { ...toRefs(state), setUser }
}