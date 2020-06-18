import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { DarkGold, LightTan, BurntOrange, DarkPurple, LightPurple } from '../ColorPalette'
import styled from 'styled-components'
import * as yup from 'yup';

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: ${LightPurple};
box-shadow: 2px 2px 3px 3px ${DarkPurple};
border-radius: 2rem;
padding: 2.5%;
width: 40%;
margin: 0 auto;

    pre {
        color: ${BurntOrange};
    }

`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 3vh;

`;

// div style={{display: 'flex', flexDirection: 'column', width: '50%', height: '3vh', positionLeft: '50%'}}>

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
    const [formData, setFormData] = useState(formInitial)
    const [errors, setErrors] = useState(formInitial)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        formSchema.validate(formData).then(() => {
            setDisabled(false)
        })
    }, [formData])

    const formSchema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('Email is required'),
        password: yup.string().min(6).required('A password is required')
      });


    const handleChange = e => {
        e.persist()
        setFormData({...formData, [e.target.name]: e.target.value})
        validateChange(e)
    };

    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate((e.target.value))
          .then(valid => {
            setErrors({...errors, [e.target.name]: ""});
          })
          .catch(err => {
                setErrors({...errors, [e.target.name]: err.errors[0]});
                setDisabled(true)
          });
      };
    
    const submitChange = (e) => {
        e.preventDefault()

    }



    let history = useHistory();
    return (
        <Form onSubmit={submitChange}>
            
            <FormLabel htmlFor="email">
                Email: 
            </FormLabel>
            <ErrorContainer>
                <FormInput name='email' onChange={handleChange} value={formData.email} placeholder='Please enter your email'/>
                {(errors.email.length > 0 ? <pre>{errors.email}</pre> : undefined)}
            </ErrorContainer>
            <FormLabel htmlFor="password">
                Password:
            </FormLabel>
            <ErrorContainer>
            <FormInput type='password' name='password' onChange={handleChange} value={formData.password} />
            {(errors.password.length > 0 ? <pre>{errors.password}</pre> : undefined)}
            </ErrorContainer>
            <button onClick={(type === 'signup' ? history.goBack : undefined)} disabled={disabled}>{(type === 'signup' ? 'Sign Up' : 'Log in')}</button>
        </Form>
    )
}

export default LoginForm

