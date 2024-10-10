import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice/chatSlice";

const store = configureStore({
    chat : chatSlice
})

export default store;