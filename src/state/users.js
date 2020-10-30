import { reactive, toRefs } from "vue"

const state = reactive({
    user: {},
    authInfo: ""
})
export default function userUsers() {
    // const load = async () => {
    //     try {
    //         const users = await new Promise((resolve) => {
    //             setInterval(() => {
    //                 resolve(["user1, user2"])
    //             }, 2000)

    //         })
    //         console.log(users)
    //         state.users = users
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
    const setUser = (googleUser, authInfo) =>{
        state.user = googleUser,
        state.authInfo = authInfo
    }
    return { ...toRefs(state), setUser }
}