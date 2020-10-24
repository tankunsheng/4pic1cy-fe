import { reactive, toRefs } from "vue"
// import { reactive } from "vue"

const state = reactive({
    users: ["test"]
})
export default function userUsers() {
    const load = async () => {
        try {
            const users = await new Promise((resolve) => {
                setInterval(() => {
                    resolve(["user1, user2"])
                }, 2000)

            })
            console.log(users)
            state.users = users
        } catch (e) {
            console.log(e)
        }

    }
    return { ...toRefs(state), load }
    // return { ...state, load }
}