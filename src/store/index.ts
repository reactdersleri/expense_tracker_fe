import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { UserState } from "../types/user";
import categoriesReducer from "./reducers/categoriesReducer";
import recordReducer from "./reducers/recordReducer";
import userReducer from "./reducers/userReducer";

export interface AppState {
    user: UserState;
    categories: CategoryState;
    records: any;
}


const rootReducer = combineReducers<AppState>({
    user: userReducer,
    categories: categoriesReducer,
    records: recordReducer,
})


export default rootReducer;