import { User, UserAction, UserState } from "../../types/user";


const defaultState: UserState = {
    data: {} as User,
    loading: false,
    error: ""
}

const userReducer = (state: UserState = defaultState, action: UserAction) => {
    switch (action.type) {
        case "LOGİN_START":
        case "IS_LOGGED_IN_START":
            return { ...state, loading: true, error: "" }
        case "LOGİN_SUCCESS":
        case "IS_LOGGED_IN_SUCCESS":
            return { ...state, data: action.payload, loading: false, error: "" }
        case "LOGİN_ERROR":
            return { ...state, loading: false, error: "Login failed" }
        case "IS_LOGGED_IN_ERROR":
            return { ...state, loading: false, error: "Token missing invalid" } 
        case "LOGOUT":
            return { ...state, data: {} as User };
        default:
            return state;
    }
}

export default userReducer;