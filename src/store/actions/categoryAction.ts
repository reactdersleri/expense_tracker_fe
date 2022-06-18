
import { Category, CategoryDispatch, CategoryForm } from "../../types/category";
import api from "../../utils/api";

export const getCategories = () => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "GET_CATEGORY_START" })
    try {
        const response = await api().get<Category[]>("/categories");
        dispatch({ type: "GET_CATEGORY_SUCCESS", payload: response.data });
    } catch {
        dispatch({ type: "GET_CATEGORY_ERROR" });
    }
}

export const addCategory = (form: CategoryForm) => async (dispatch: CategoryDispatch) => {
    dispatch({ type: "ADD_CATEGORY_START" })
    try {
        const response = await api().post<Category>("/categories", form);
        dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "ADD_CATEGORY_ERROR" });
    }
}


export const updateCategory = (form: Partial<CategoryForm>, categoryID: number) => async (dispatch: CategoryDispatch) => {
    //** Eğer form objesi olan category formdaki parametrelerin hepsini girmek zorunda değilseniz güncelle işlemlerinde mesela Partial<Object> şeklinde kullanamalıyız. */
    dispatch({ type: "UPDATE_CATEGORY_START" })
    try {
        const response = await api().put<Category>("/categories/" + categoryID, form)
        dispatch({ type: "UPDATE_CATEGORY_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "UPDATE_CATEGORY_ERROR" })
    }
}

export const deleteCategory = (categoryID: number) => async (dispacth: CategoryDispatch) => {
    dispacth({ type: "DELETE_CATEGORY_START" })
    try {
        await api().delete("/categories/" + categoryID)
        dispacth({ type: "DELETE_CATEGORY_SUCCESS" ,payload: categoryID})
    } catch {
        dispacth({ type: "DELETE_CATEGORY_ERROR" })
    }
}