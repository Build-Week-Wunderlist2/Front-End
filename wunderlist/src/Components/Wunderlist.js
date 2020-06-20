import React from 'react';
import { useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth'
import axios from 'axios';
import styled from 'styled-components';

const testing = (user_id) => {
    axiosWithAuth().get(`/user/${user_id}/todos`).then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}

const testing2 = () => {
    axios.get('https://todolist1213.herokuapp.com/api/user/6/todos').then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })
}



const Wunderlist = () => {
    return <button onClick={testing}>Test</button>

}

export default Wunderlist