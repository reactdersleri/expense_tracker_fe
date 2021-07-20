import { ThunkDispatch } from "redux-thunk";

export interface CategoryState {
  data: Category[];
  loading: boolean;
  error: string;
}

export interface Category {
  id: number;
  name: string;
  type: string;
  color: string;
}

export interface CategoryForm {
  name: string;
  type: "income" | "expense";
  color?: string;
}

interface GET_START {
  type: "GET_CATEGORIES_START";
}

interface GET_SUCCESS {
  type: "GET_CATEGORIES_SUCCESS";
  payload: Category[];
}

interface GET_ERROR {
  type: "GET_CATEGORIES_ERROR";
}

interface ADD_START {
  type: "ADD_CATEGORY_START";
}

interface ADD_SUCCESS {
  type: "ADD_CATEGORY_SUCCESS";
  payload: Category;
}

interface ADD_ERROR {
  type: "ADD_CATEGORY_ERROR";
}

export type CategoryAction =
  | GET_START
  | GET_SUCCESS
  | GET_ERROR
  | ADD_START
  | ADD_SUCCESS
  | ADD_ERROR;
export type CategoryDispatch = ThunkDispatch<
  CategoryState,
  void,
  CategoryAction
>;
