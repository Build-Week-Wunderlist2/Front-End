import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import * as yup from 'yup';

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const FormLabel = styled.label`
    display: flex;
    justify-content: space-between;
    margin: 1% 0;
`;

const formInitial = {
    email: '',
    password: ''
}

const FormInput = styled.input`
    text-align: center;
`;


const LoginForm = ({type}) => {
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
        
        // setIsLoading(true);
        // axiosWithAuth()
        // .post("",formData)
        // .then(res=>{
        //     localStorage.setItem("token",res.data.payload);
        //     setIsLoading(false);
        //     history.push("/");
        // });
        formSchema.validate(formData).then({
            
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
            <button onClick={(type === 'signup' ? history.goBack : undefined)}>{(type === 'signup' ? 'Sign Up' : 'Log in')}</button>
        </Form>
    )
}

export default LoginForm