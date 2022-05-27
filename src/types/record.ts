import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

export interface Record {
    id: number;
    title: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface RecordForm {
    title: string,
    amount: number,
    category_id: number,
}


export interface RecordState {
    data: Record[];
    loading: boolean;
    error: string;
}

interface GET_RECORDS_START {
    type: "GET_RECORDS_START";
}

interface GET_RECORDS_SUCCESS {
    type: "GET_RECORDS_SUCCESS";
    payload: Record[];
}

interface GET_RECORDS_ERROR {
    type: "GET_RECORDS_ERROR";
}

interface ADD_RECORDS_START {
    type: "ADD_RECORDS_START";
}

interface ADD_RECORDS_SUCCESS {
    type: "ADD_RECORDS_SUCCESS";
    payload: Record;
}

interface ADD_RECORDS_ERROR {
    type: "ADD_RECORDS_ERROR";
}

interface UPDATE_RECORDS_START {
    type: "UPDATE_RECORDS_START";
}

interface UPDATE_RECORDS_SUCCESS {
    type: "UPDATE_RECORDS_SUCCESS";
    payload: Record;
}

interface UPDATE_RECORDS_ERROR {
    type: "UPDATE_RECORDS_ERROR";
}

interface DELETE_RECORDS_START {
    type: "DELETE_RECORDS_START";
}

interface DELETE_RECORDS_SUCCESS {
    type: "DELETE_RECORDS_SUCCESS";
    payload: number;
}

interface DELETE_RECORDS_ERROR {
    type: "DELETE_RECORDS_ERROR";
}


export type RecordAction = 
    GET_RECORDS_START
    | GET_RECORDS_SUCCESS
    | GET_RECORDS_ERROR
    | ADD_RECORDS_START
    | ADD_RECORDS_SUCCESS
    | ADD_RECORDS_ERROR
    | UPDATE_RECORDS_START
    | UPDATE_RECORDS_SUCCESS
    | UPDATE_RECORDS_ERROR
    | DELETE_RECORDS_START
    | DELETE_RECORDS_SUCCESS
    | DELETE_RECORDS_ERROR


export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>