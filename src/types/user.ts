import { ThunkDispatch } from "redux-thunk";

export interface User {
    message: string;
    username: string;
    email: string;
    full_name: string;
    token: string;
}

export interface LoginForm {
    username: string;
    password: string;
}

export interface UserState {
    data: User;
    loading: boolean;
    error: string;
}

interface LOGİN_START {
    type: "LOGİN_START";
}

interface LOGİN_SUCCESS {
    type: "LOGİN_SUCCESS";
    payload : User;
}

interface LOGİN_ERROR {
    type: "LOGİN_ERROR";
}

export type UserAction = LOGİN_START | LOGİN_SUCCESS | LOGİN_ERROR;
export type UserDispatch = ThunkDispatch<UserState,void,UserAction>