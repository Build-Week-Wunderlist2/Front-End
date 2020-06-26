import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  DarkGold,
  LightTan,
  BurntOrange,
  DarkPurple,
  LightPurple,
} from "../ColorPalette";
import { device } from "../Breakpoints";
import styled from "styled-components";
import * as yup from "yup";
import axiosWithAuth from "../utils/axiosWithAuth";
import MainHeader from "./MainHeader";

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

    @media ${device.mobileM} {
      font-size: 0.7rem;
    }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  username: "",
  password: "",
};
// both Login and Signup Form. used tertiary if else to make one form work for all. allows multiple users to sign up and login in and pushes user to their list
const LoginForm = ({ type }) => {
  const [formData, setFormData] = useState(formInitial);
  const [errors, setErrors] = useState(formInitial);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    formSchema
      .validate(formData)
      .then(() => {
        setDisabled(false);
      })
      .catch((err) => {
        //
      });
  }, [formData]);

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    password: yup
      .string()
      .required("A password is required")
      .min(6, "Minimum 6 characters"),
  });

  const handleChange = (e) => {
    e.persist();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateChange(e);
  };

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
        setDisabled(true);
      });
  };

  const submitChange = (e) => {
    e.preventDefault();
    type === "signup"
      ? axiosWithAuth()
          .post("/auth/register", formData)
          .then((res) => {
            history.push("/login");
          })
          .catch((err) => {
            console.error(err.message);
          })
      : axiosWithAuth()
          .post("/auth/login", formData)
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            history.push(`/wunderlist/${res.data.user_id}`); //changed props not used in imported history
          })
          .catch((err) => console.error(err.message));
  };

  let history = useHistory();
  return (
    <>
      <MainHeader type={type} />
      <Form onSubmit={submitChange}>
        <FormLabel htmlFor="username">Email</FormLabel>
        <ErrorContainer>
          <FormInput
            type="string"
            name="username"
            onChange={handleChange}
            value={formData.username}
            placeholder="Please enter your email"
          />
          {errors.username.length > 0 ? (
            <pre>{errors.username}</pre>
          ) : undefined}
        </ErrorContainer>
        <FormLabel htmlFor="password">Password</FormLabel>
        <ErrorContainer>
          <FormInput
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          {errors.password.length > 0 ? (
            <pre>{errors.password}</pre>
          ) : undefined}
        </ErrorContainer>
        <SubmitButton type="submit" disabled={disabled}>
          {type === "signup" ? "Sign Up" : "Log in"}
        </SubmitButton>
      </Form>
    </>
  );
};

export default LoginForm;
