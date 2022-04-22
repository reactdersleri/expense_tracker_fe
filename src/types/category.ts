import { ThunkDispatch } from "redux-thunk";
import Category from "../components/Categories";

export interface CategoryState {
    data: Category[],
    loading: boolean,
    error: string
}

export interface Category {
    id: number,
    name: string,
    type: "expense" | "income",
    color: string
}

export interface CategoryForm {
    name: string;
    type: "expense" | "income";
    color?: string;
}

export interface UserState {
    data: Category;
    loading: boolean;
    error: string;
}

interface GET_CATEGORIES_START {
    type: "GET_CATEGORIES_START"
}

interface GET_CATEGORIES_SUCCESS {
    type: "GET_CATEGORIES_SUCCESS",
    payload: Category[];
}

interface GET_CATEGORIES_ERROR {
    type: "GET_CATEGORIES_ERROR";
}

interface ADD_CATEGORIES_START {
    type: "ADD_CATEGORIES_START"
}

interface ADD_CATEGORIES_SUCCESS {
    type: "ADD_CATEGORIES_SUCCESS",
    payload: Category;
}

interface ADD_CATEGORIES_ERROR {
    type: "ADD_CATEGORIES_ERROR";
}

interface UPDATE_CATEGORIES_START {
    type: "UPDATE_CATEGORIES_START"
}

interface UPDATE_CATEGORIES_SUCCESS {
    type: "UPDATE_CATEGORIES_SUCCESS",
    payload: Category;
}

interface UPDATE_CATEGORIES_ERROR {
    type: "UPDATE_CATEGORIES_ERROR";
}


export type CategoryAction =
    GET_CATEGORIES_START
    | GET_CATEGORIES_SUCCESS
    | GET_CATEGORIES_ERROR
    | ADD_CATEGORIES_START
    | ADD_CATEGORIES_SUCCESS
    | ADD_CATEGORIES_ERROR
    | UPDATE_CATEGORIES_START
    | UPDATE_CATEGORIES_SUCCESS
    | UPDATE_CATEGORIES_ERROR;

export type CategoryDispatch = ThunkDispatch<CategoryState, void, CategoryAction>;