import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { publics } from "../utils/session";
import { Spinner } from "react-bootstrap";
import { loginUser } from "../UserRedux/userStore";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const path = window.location.origin

  // redux state
  const loading = useSelector(({ users: { loading } }) => loading);
  const login_errors = useSelector(({ users: { login_errors } }) => login_errors);

  publics(history);
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
    // login(form, history);
    loginUser(dispatch, form, path);
  };

  if (sessionStorage.getItem("blog")) {
    history.push("/");
  }
  

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div>
            <i className='fa fa-envelope'></i>
            <input
              type='text'
              name='email'
              placeholder='Email Address...'
              value={form.email}
              onChange={handleInput}
            />
            {login_errors.email && <label>Email field is empty</label>}
          </div>
          <div>
            <i className='fa fa-unlock'></i>
            <input
              type='password'
              name='password'
              placeholder='Your Password...'
              value={form.password}
              onChange={handleInput}
            />
            {login_errors.password && <label>Password field is empty</label>}
          </div>
          <NotRegister>
            <Link className='link' to='/resetpassword'>
              Forgot password
            </Link>
          </NotRegister>
          <Button type='submit' className='button'>
            {loading ? (
              <div style={{ display: "flex" }}>
                <Spinner
                  animation='border'
                  variant='info'
                  style={{ width: "16px", height: "16px" }}
                />{" "}
                Login
              </div>
            ) : (
              <>
                <i className='fa fa-share-square'></i> Login
              </>
            )}
          </Button>
        </Form>

        <NotRegister>
          <p>If you have not register yet click</p>
          <Link className='link' to='/register'>
            Register
          </Link>
        </NotRegister>
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.div`
  min-height: calc(100vh - 4em);
  background: url('./city.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 4em;
  left: 0;
  right: 0;
`;
export const Container = styled.div`
  width: 70%;
  padding: 1em;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 15px #ccc;
  border-radius: 1em;
  margin-top: 5%;
  background-color: rgba(255, 255, 255, 0.8);

  @media (max-width: 769px) {
    width: 94%;
  }
`;

export const NotRegister = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;

  .link {
    text-decoration: none;
    color: dodgerblue;
  }

  p {
    margin: 0;
    padding-top: 0.1em;
    padding-right: 0.5em;
  }
`;

export const Form = styled.form`
  width: 100%;
  padding: 0 10%;

  @media (max-width: 1400px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 769px) {
    width: 100%;
    padding: 0;
  }

  .error {
    &::placeholder {
      color: red;
    }
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
      outline: none;
      border: none;
      appearance: none;
      border-radius: 0.7em 0 0.7em 0;
      background: rgba(255, 255, 255, 0.4);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: 0.4s ease-in;

      &:focus {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: none;
      }
    }
    label{
      color: orangered;
      margin: 0;
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
