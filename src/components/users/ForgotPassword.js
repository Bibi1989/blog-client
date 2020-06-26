import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { UserContext } from "../userContext/UserProvider";
import { publics } from "../utils/session";
import { Spinner } from "react-bootstrap";

const ForgotPassword = () => {
  const history = useHistory();
  publics(history);
  const { login, login_errors, loading } = useContext(UserContext);
  const [form, setForm] = useState({
    password: "",
    confirm_password: "",
  });

  const handleInput = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(form, history);
  };
  console.log(loading);

  if (sessionStorage.getItem("blog")) {
    history.push("/");
  }

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleLogin}>
          <h1>Create Your Password</h1>
          <p style={{ color: "red" }}>
            {(login_errors === "password is invalid" ||
              login_errors === "Invalid email or your yet to register") &&
              "Invalid email or password!!!"}
          </p>
          <div>
            <i className='fa fa-envelope'></i>
            <input
              type='password'
              name='password'
              placeholder='New Password'
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <i className='fa fa-unlock'></i>
            <input
              className={login_errors === "Password is empty!!!" && "error"}
              style={
                login_errors === "Password is empty!!!"
                  ? {
                      border: "0.3px solid #ff00007a",
                      boxShadow: "0 2px 10px #ff00007a",
                    }
                  : {}
              }
              type='text'
              name='password'
              placeholder={
                login_errors === "Password is empty!!!"
                  ? login_errors
                  : "Password..."
              }
              value={form.password}
              onChange={handleInput}
            />
          </div>
          <Button type='submit' className='button'>
            {loading ? (
              <div style={{ display: "flex" }}>
                <Spinner
                  animation='border'
                  variant='info'
                  style={{ width: "16px", height: "16px" }}
                />{" "}
                Create Password
              </div>
            ) : (
              <>
                <i className='fa fa-share-square'></i> Create Password
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
  min-height: 100vh;
  /* background: #f9fbfc; */
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

  @media (max-width: 1400px) {
    width: 90%;
  }
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 769px) {
    width: 96%;
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

export default ForgotPassword;
