import { auth } from "$lib/firebase/firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { writable } from "svelte/store"

export const authStore = writable({
    user: null,
    loading: true,
    data: {}
})

export const authHandlers = {
    // @ts-ignore
    signup: async (email, pass) => {
        await createUserWithEmailAndPassword(auth, email, pass)

    },
    // @ts-ignore
    login: async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass)
    },

    // TODO: implement logout
    // logout: async()=>{
    //     await signOut(auth)
    // }
}