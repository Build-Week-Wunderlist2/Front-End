import axios from 'axios';

//sets the token to localStorage and adds it as a Header to Authorization. Used throughout the app to ensure user as the correct authorization to access site


const axiosWithAuth = () => {
    const token = localStorage.getItem("token");
    return axios.create({
        baseURL: "https://todolist1213.herokuapp.com/api",
        headers: {
            Authorization: token
        }
    });
}

export default axiosWithAuth;