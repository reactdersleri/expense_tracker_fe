import { RecordAction, RecordState } from "../../types/record";

const defaultState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

const recordReducer = (
  state: RecordState = defaultState,
  action: RecordAction
): RecordState => {
  switch (action.type) {
    case "GET_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORDS_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORDS_ERROR":
      return { ...state, loading: false, error: "Error fetching records" };
    case "ADD_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Error adding record" };
    default:
      return state;
  }
};

export default recordReducer;
