import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserContext } from "../userContext/UserProvider";
import { publics } from "../utils/session";

const Login = () => {
  const history = useHistory();
  const loc = useLocation();
  const port = window.location.port;
  const path = loc;
  console.log(port);
  publics(history);
  const { login, login_errors } = useContext(UserContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(login_errors);
    login(form, history);
  };

  // if (sessionStorage.getItem("auth")) {
  //   history.push("/");
  // }

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <i className='fa fa-envelope'></i>
          <input
            style={
              login_errors.email
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 15px #ff00007a",
                  }
                : {}
            }
            type='text'
            name='email'
            placeholder={
              login_errors.email ? login_errors.email : "Email Address..."
            }
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              login_errors.password
                ? {
                    border: "0.3px solid #ff00007a",
                    boxShadow: "0 2px 10px #ff00007a",
                  }
                : {}
            }
            type='text'
            name='password'
            placeholder={
              login_errors.password ? login_errors.password : "Password..."
            }
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <Button type='submit' className='button'>
          <i className='fa fa-share-square'></i> Login
        </Button>
      </Form>
    </Container>
  );
};

export const Container = styled.div`
  padding-top: 10%;
`;

export const Form = styled.form`
  width: 50%;
  min-height: 40vh;
  padding: 1em;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 15px #ccc;
  border-radius: 1em;

  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 769px) {
    width: 96%;
  }

  .error {
    color: red;
  }

  h1 {
    font-size: 3rem;
    color: teal;
    text-align: center;
    padding-bottom: 1.5rem;
  }

  div {
    width: 100%;
    margin: auto;
    position: relative;
    top: 0;
    i {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      color: teal;
    }
    input {
      width: 100%;
      padding: 15px 30px;
      margin: 15px 0;
      border-radius: 5px;
      outline: none;
      border: 0.4px solid #eee;
      box-shadow: 0 3px 15px #eee;

      &:focus {
        background: #f1f1f1;
      }
    }
  }
  .button {
    display: block;
    border-radius: 30px;
    padding: 1em 2.5em;
    outline: none;
    background: teal;
    color: #eee;
    margin: 1rem auto;
    cursor: pointer;
  }
`;

export default Login;
