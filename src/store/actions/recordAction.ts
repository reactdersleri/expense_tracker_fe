import { RecordDispatch, Record, RecordForm } from "../../types/record";
import api from "../../utils/api";

export const getRecords = () => async (dispatch: RecordDispatch) => {
    dispatch({ type: "GET_RECORDS_START" })
    try {
        const response = await api.get<Record[]>("/records");
        dispatch({ type: "GET_RECORDS_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "GET_RECORDS_ERROR" });
    }
}

export const addRecord = (form: RecordForm) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "ADD_RECORDS_START" })
    try {
        const response = await api.post<Record>("/records", form);
        dispatch({ type: "ADD_RECORDS_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "ADD_RECORDS_ERROR" })
    }
}

export const updateRecord = (form: RecordForm, recordID: Record['id']) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "UPDATE_RECORDS_START" })
    try {
        const response = await api.put<Record>("/records/" + recordID, form);
        dispatch({ type: "UPDATE_RECORDS_SUCCESS", payload: response.data })
    } catch {
        dispatch({ type: "UPDATE_RECORDS_ERROR" })
    }
}

export const deleteRecord = (recordID: number) => async (dispatch: RecordDispatch) => {
    dispatch({ type: "DELETE_RECORDS_START" })
    try {
        await api.delete("/records/" + recordID);
        dispatch({ type: "DELETE_RECORDS_SUCCESS", payload: recordID })
    } catch {
        dispatch({ type: "DELETE_RECORDS_ERROR" })
    }
}



