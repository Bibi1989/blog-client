import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { publics } from "../utils/session";
import { UserContext } from "../userContext/UserProvider";
import { Container } from "./Login";
import { getFile } from "./GetImageFile";
import { Spinner } from "react-bootstrap";

const Register = () => {
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState([]);
  const [showBtn, setShowBtn] = useState(true);
  const [errorCheck, setErrorCheck] = useState();
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

  const handleFile = async ({ target: { files } }) => {
    setShowBtn(false);
    await getFile(files, setImageUrl, form);
    setShowBtn(true);
  };

  console.log(imageUrl);

  const handleRegister = (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setErrors("Password do not match");
    }
    let data = {
      ...form,
      image_url: JSON.stringify(imageUrl),
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
    <Container>
      <Form>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div>
            <i className='fa fa-user'></i>
            <input
              className={register_errors === "Username is empty!!!" && "error"}
              style={
                register_errors === "Username is empty!!!"
                  ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                  : {}
              }
              type='text'
              name='username'
              placeholder={
                register_errors === "Username is empty!!!"
                  ? register_errors
                  : "Username..."
              }
              value={form.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <i className='fa fa-envelope'></i>
            <input
              className={register_errors === "Email is empty!!!" && "error"}
              style={
                register_errors === "Email is empty!!!"
                  ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                  : {}
              }
              type='text'
              name='email'
              placeholder={
                register_errors === "Email is empty!!!"
                  ? register_errors
                  : "Email Address..."
              }
              value={form.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <i className='fa fa-unlock'></i>
            <input
              className={register_errors === "password is empty!!!" && "error"}
              style={
                register_errors === "Password is empty!!!"
                  ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                  : {}
              }
              type='text'
              name='password'
              placeholder={
                register_errors === "Password is empty!!!"
                  ? register_errors
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
              onChange={handleInput}
            />
          </div>
          <div>
            <i className='fa fa-folder-open'></i>
            <input
              style={
                error
                  ? { border: "#ff00007a", boxShadow: "0px 2px 15px #ff00007a" }
                  : {}
              }
              type='file'
              name='file'
              onChange={handleFile}
              multiple
            />
          </div>
          {showBtn ? (
            <button type='submit'>
              <i className='fa fa-share-square'></i> Register
            </button>
          ) : (
            <button disabled>
              <Spinner
                animation='border'
                style={{ width: "1em", height: "1em" }}
              />{" "}
              Uploading...
            </button>
          )}
        </form>
      </Form>
    </Container>
  );
};

const Form = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 3px 15px #ccc;
  border-radius: 1em;
  margin-top: 5%;

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
