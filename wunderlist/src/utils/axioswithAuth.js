import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: "https://todolist1213.herokuapp.com/api",
        headers: {
            Authorization: token,
        }
    });
}
