import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { publics } from "../utils/session";
import { UserContext } from "../userContext/UserProvider";
import { Wrapper, Container, NotRegister } from "./Login";

const Register = () => {
  const history = useHistory();
  publics(history);
  const { register, register_errors } = useContext(UserContext);
  const [error, setErrors] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (event) => {
    const { value } = event.target;
    const { name } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setErrors("Password do not match");
    }
    let data = {
      ...form,
    };
    register(data, history);
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Wrapper>
      <Container>
        <Form>
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div>
              <i className='fa fa-user'></i>
              <input
                type='text'
                name='firstname'
                placeholder='First Name'
                value={form.firstname}
                onChange={handleInput}
              />
            </div>
            <div>
              <i className='fa fa-user'></i>
              <input
                type='text'
                name='lastname'
                placeholder='Last Name'
                value={form.lastname}
                onChange={handleInput}
              />
            </div>
            <div>
              <i className='fa fa-user'></i>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={form.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <i className='fa fa-envelope'></i>
              <input
                type='text'
                name='email'
                placeholder='Password'
                value={form.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <i className='fa fa-unlock'></i>
              <input
                type='password'
                name='password'
                placeholder='Confirm Password'
                value={form.password}
                onChange={handleInput}
              />
            </div>
            <div>
              <i className='fa fa-unlock'></i>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleInput}
              />
            </div>

            <button type='submit'>
              <i className='fa fa-share-square'></i> Register
            </button>
          </form>
        </Form>
        <NotRegister>
          <p>If you have an account click</p>
          <Link className='link' to='/login'>
            Login
          </Link>
        </NotRegister>
      </Container>
    </Wrapper>
  );
};

const Form = styled.div`
  width: 100%;

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
  form {
    width: 100%;
    display: block;
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
        padding: 8px 30px;
        margin: 15px 0;
        border-radius: 5px;
        outline: none;
        border: 0.4px solid #eee;
        box-shadow: 0 3px 15px #eee;

        &input:focus {
          background: #f1f1f1;
        }
      }
    }
    button {
      display: block;
      padding: 10px 25px;
      font-size: 1.1rem;
      border-radius: 30px;
      outline: none;
      border: 0.4px solid #eee;
      box-shadow: 0 3px 15px #eee;
      background: teal;
      color: #eee;
      margin: 1rem auto;
      cursor: pointer;
    }
  }
`;

export default Register;
