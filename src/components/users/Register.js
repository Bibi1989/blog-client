import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import { publics } from "../utils/session";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Container, NotRegister } from "./Login";
import { registerUser } from "../UserRedux/userStore";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  publics(history);
  const [error, setErrors] = useState("");
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const register_errors = useSelector(({ users: { register_errors } }) => register_errors);

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
    registerUser(dispatch, data, history);
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
              {register_errors.firstname && <label>First Name is empty</label>}
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
              {register_errors.lastname && <label>Last Name is empty</label>}
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
              {register_errors.username && <label>Username is empty</label>}
            </div>
            <div>
              <i className='fa fa-envelope'></i>
              <input
                type='text'
                name='email'
                placeholder='Email Address'
                value={form.email}
                onChange={handleInput}
              />
              {register_errors.email && <label>Email is empty</label>}
            </div>
            <div>
              <i className='fa fa-unlock'></i>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={form.password}
                onChange={handleInput}
              />
              {register_errors.password && <label>Password is empty</label>}
            </div>
            <div>
              <i className='fa fa-unlock'></i>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleInput}
              />
              {error && <label>Password do not match</label>}
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
        padding: 15px 30px;
        margin: 8px 0;
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
