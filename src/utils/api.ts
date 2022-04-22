import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
        Authorization: token as string,
    },
});