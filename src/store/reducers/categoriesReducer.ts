import { CategoryAction, CategoryState } from "../../types/category";

const defaultState: CategoryState = {
    data: [],
    loading: false,
    error: ""
}

const categoriesReducer = (state: CategoryState = defaultState, action: CategoryAction) => {
    switch (action.type) {
        case "GET_CATEGORY_START":
            return { ...state, loading: true, error: "" }
        case "GET_CATEGORY_SUCCESS":
            return { ...state, loading: false, error: "", data: action.payload }
        case "GET_CATEGORY_ERROR":
            return { ...state, loading: false, error: "Error fetching error" }
        case "ADD_CATEGORY_START":
            return { ...state, loading: true, error: "" }
        case "ADD_CATEGORY_SUCCESS":
            return { ...state, loading: false, error: "", data: [action.payload, ...state.data] }
        case "ADD_CATEGORY_ERROR":
            return { ...state, loading: false, error: "Error adding category" }
        case "UPDATE_CATEGORY_START":
            return { ...state, loading: true, error: "" }
        case "UPDATE_CATEGORY_SUCCESS":
            return { ...state, loading: false, error: "", data: state.data.map(category => category.id === action.payload.id ? action.payload : category) }
        //** Yani data'da eğer actionpayloaddan gelen id (yani kullanıcıdan) category'nin id'si ile eşleşiyorsa action payload'ı döndürürcek değilse hali hazırda olan kategoriyi döndürücek. */
        case "UPDATE_CATEGORY_ERROR":
            return { ...state, loading: false, error: "Error updating category" }
        case "DELETE_CATEGORY_START":
            return { ...state, loading: true, error: "" }
        case "DELETE_CATEGORY_SUCCESS":
            return { ...state, loading: false, error: "", data: state.data.filter(category => category.id !== action.payload) }
        case "DELETE_CATEGORY_ERROR":
            return { ...state, loading: false, error: "Error deleting category" }
        default:
            return state
    }
}

export default categoriesReducer;