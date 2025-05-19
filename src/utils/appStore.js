import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestReudcer from "./requestsSlice"
const appStore = configureStore({

    reducer:{
        user: userReducer,
        feed:  feedReducer,
        connections: connectionReducer,
        requests:requestReudcer
    },
})
export default appStore;