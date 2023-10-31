import { configureStore } from '@reduxjs/toolkit'
import user from "../store/reducers/User"
export const Store=configureStore({
    reducer:{
        users:user
    }
})