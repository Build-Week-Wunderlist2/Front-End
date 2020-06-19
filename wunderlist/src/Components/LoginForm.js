import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple } from '../ColorPalette';
import { device } from '../Breakpoints';
import styled from 'styled-components';
import * as yup from 'yup';
import axios from 'axios'

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: ${LightPurple};
box-shadow: 2px 2px 3px 3px ${DarkPurple};
border-radius: 2rem;
padding: 2.5%;
width: 35%;
margin: 0 auto;
@media ${device.laptopL} {
    width: 40%;
}
@media ${device.laptop} {
    width: 45%;
}
@media ${device.tablet} {
    width: 70%;
}
@media ${device.mobileL} {
    width: 90%;
}
    pre {
        display: flex;
        justify-content: center;
        color: ${BurntOrange};
        font-size: 1rem;
        margin: 1%;
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    /* text-align: center; */
    width: 90%;
    height: 4vh;
    margin: 1%;
    @media ${device.mobileL} {
        height: 5.5vh;
    }
    @media ${device.mobileM} {
        height: 6.5vh;
    }
    @media ${device.mobileS} {
        height: 7vh;
    }
`;

// div style={{display: 'flex', flexDirection: 'column', width: '50%', height: '3vh', positionLeft: '50%'}}>

const FormLabel = styled.label`
    font-size: 1.3rem;
    display: flex;
    justify-content: space-between;
    margin: 1% 0;
    text-shadow: 1px 1px gray;
`;

const FormInput = styled.input`
    text-align: center;
    font-size: 1.2rem;
    border-radius: 10px;
    color: ${DarkGold};
    font-weight: 900;
    box-shadow: 1px 1px ${LightTan};
`;

const SubmitButton = styled.button`
    width: 50%;
    height: 2em;
    margin: 2%;
    border-radius: 10px;
    font-size: 1.1rem;
`;

const formInitial = {
    email: '',
    password: ''
}


const LoginForm = ({type}, props) => {
    const [formData, setFormData] = useState(formInitial);
    const [errors, setErrors] = useState(formInitial);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('Email is required'),
        password: yup.string().min(6).required('A password is required')
      });


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    const submitChange = (e) => {
        e.preventDefault()
        formSchema.validate(formData).then({
            
        })
        axios
            .post("https://todolist1213.herokuapp.com/api/regiser",formData)
            .then(res=>{
                localStorage.setItem("token",res.data.payload);
                props.history.push("/login");
                console.log(res)
            })
        .catch(err=>
          console.error(err.message));
        };
        // setFormData(FormInitial)
    

    let history = useHistory();
    return (
        <Form onSubmit={submitChange}>
            <FormLabel htmlFor="email">
                Email:
            </FormLabel>
            <FormInput name='email' onChange={handleChange} value={formData.email} placeholder='Please enter your email'/>
            <FormLabel htmlFor="password">
                Password:
            </FormLabel>
            <FormInput type='password' name='password' onChange={handleChange} value={formData.password} />
            <button>{(type === 'signup' ? 'Sign Up' : 'Log in')}</button>
        </Form>
    )
}

export default LoginForm