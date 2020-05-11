import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { publics } from "../utils/session";
import { UserContext } from "../userContext/UserProvider";

const Register = () => {
  const history = useHistory();
  publics(history);
  const { register, register_errors } = useContext(UserContext);
  const [error, setErrors] = useState("");
  const [form, setForm] = useState({
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
    register(form);
    return history.push("/");
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Form>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <i className='fa fa-user'></i>
          <input
            style={
              register_errors.username
                ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                : {}
            }
            type='text'
            name='username'
            placeholder={
              register_errors.username
                ? register_errors.username
                : "Username..."
            }
            value={form.username}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-envelope'></i>
          <input
            style={
              register_errors.email
                ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                : {}
            }
            type='text'
            name='email'
            placeholder={
              register_errors.email ? register_errors.email : "Email Address..."
            }
            value={form.email}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              register_errors.password
                ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                : {}
            }
            type='text'
            name='password'
            placeholder={
              register_errors.password
                ? register_errors.password
                : "Password..."
            }
            value={form.password}
            onChange={handleInput}
          />
        </div>
        <div>
          <i className='fa fa-unlock'></i>
          <input
            style={
              error
                ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                : {}
            }
            type='text'
            name='confirmPassword'
            placeholder={
              error ? "Password do not match" : "Confirm Password..."
            }
            value={error ? error : form.confirmPassword}
            onChange={handleInput}
          />
        </div>
        <button type='submit'>
          <i className='fa fa-share-square'></i> Register
        </button>
      </form>
    </Form>
  );
};

const Form = styled.div`
  height: 70vh;
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 3px 15px #ccc;
  border-radius: 1em;
  margin-top: 5%;

  .error {
    color: red;
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
      width: 80%;
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
