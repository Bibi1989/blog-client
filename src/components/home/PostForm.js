import React, { useState } from "react";
import styled from "styled-components";
import { addPost } from "../BlogRedux/store";
import { Icon, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const PostForm = () => {
  const [form, setForm] = useState({
    body: "",
  });

  const dispatch = useDispatch();
  const added_post = useSelector(({ posts: { added_post } }) => added_post);
  useEffect(() => {}, [added_post]);

  const handleInput = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    addPost(dispatch, form, setForm);
    if (added_post) {
      setForm({
        body: "",
      });
    }
  };

  return (
    <Form onSubmit={onsubmit}>
      <div className='input-group'>
        <Icon name='comment' className='icon' size='big' />
        <input
          type='text'
          name='body'
          placeholder='What is on your mind!!!'
          onChange={handleInput}
          value={form.body}
        />
      </div>
      <Button className='btn' type='submit' color='blue'>
        <Icon name='comment' /> Post
      </Button>
    </Form>
  );
};

export const Form = styled.form`
  padding: 2% 10%;
  width: 100%;

  @media (max-width: 769px) {
    padding: 1em;
  }

  .btn {
    margin-top: 0.7em;
  }

  .input-group {
    width: 100%;
    display: flex;
    position: relative;

    .icon {
      font-size: 2rem;
      position: absolute;
      top: 25%;
      left: 1%;
      color: #4267b2;
    }
    input {
      width: 100%;
      padding: 30px 20px 30px 3.5rem;
      border: 0.3px solid #999;
      border-radius: 5px;
      box-shadow: 0 5px 25px #eee;
      font-size: 1.5rem;
      outline: none;
    }
  }
`;

export default PostForm;
