import { combineReducers } from "redux";
import { CategoryState } from "../types/category";
import { UserState } from "../types/user";
import categoryReducer from "./reducers/categoryReducer";
import userReducer from "./reducers/userReducer";

export interface AppState {
    user: UserState;
    categories: CategoryState;
    // records: any;
}

export const rootReducer = combineReducers<AppState>({
    user: userReducer,
    categories: categoryReducer,
    // records: () => { }
});
export default rootReducer;