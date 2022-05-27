
import { RecordAction, RecordState } from "../../types/record"

const defaultState: RecordState = {
    data: [],
    loading: false,
    error: ""
}


const recordReducer = (state: RecordState = defaultState, action: RecordAction): RecordState => {
    switch (action.type) {
        case "GET_RECORDS_START":
            return { ...state, loading: true, error: "" }
        case "GET_RECORDS_SUCCESS":
            return { ...state, loading: false, error: "", data: action.payload }
        case "GET_RECORDS_ERROR":
            return { ...state, loading: false, error: "Error fetching record" }
        case "ADD_RECORDS_START":
            return { ...state, loading: true, error: "" }
        case "ADD_RECORDS_SUCCESS":
            return { ...state, loading: false, error: "", data: [action.payload, ...state.data] }
        case "ADD_RECORDS_ERROR":
            return { ...state, loading: false, error: "Error adding record" }
        case "UPDATE_RECORDS_START":
            return { ...state, loading: true, error: "" }
        case "UPDATE_RECORDS_SUCCESS":
            return { ...state, loading: false, error: "", data: state.data.map((record) => record.id === action.payload.id ? action.payload : record) }
        case "UPDATE_RECORDS_ERROR":
            return { ...state, loading: false, error: "Error updating record" }
        case "DELETE_RECORDS_START":
            return { ...state, loading: true, error: "" }
        case "DELETE_RECORDS_SUCCESS":
            return { ...state, loading: false, error: "", data: state.data.filter(records => records.id !== action.payload) }
        case "DELETE_RECORDS_ERROR":
            return { ...state, loading: false, error: "Error deleting record" }
        default:
            return state
    }
}


export default recordReducer