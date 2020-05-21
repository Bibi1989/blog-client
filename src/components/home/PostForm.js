import React, { useState } from "react";
import styled from "styled-components";
import { addPost, updatePost, setCurrentValue } from "../BlogRedux/store";
import { Icon, Button, TextArea, FormGroup, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import Popup from "reactjs-popup";
import { Logo, Image } from "./PostBody";
import { Alert } from "react-bootstrap";

const PostForm = () => {
  let user = sessionStorage.getItem("user");
  user = JSON.parse(user);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [select, setSelect] = useState("Post");

  const history = useHistory();
  const dispatch = useDispatch();
  const added_post = useSelector(({ posts: { added_post } }) => added_post);
  const current = useSelector(({ posts: { current } }) => current);
  const update = useSelector(({ posts: { update } }) => update);
  const post_error = useSelector(({ posts: { post_error } }) => post_error);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (current !== null) {
      setTitle(current.title);
      setMessage(current.message);
    }
  }, [added_post, current, update, post_error]);

  const handleInput = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleSelect = (e) => {
    const { value } = e.target;
    setSelect(value);
  };

  const form = {
    title,
    message,
    tags: select,
  };

  if (post_error && show) {
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh! You got an error!</Alert.Heading>
        <p>{post_error}</p>
      </Alert>
    );
  }

  const onsubmit = (e) => {
    e.preventDefault();
    addPost(dispatch, form, history);
    setShow(true);
    setTitle("");
    setMessage("");
  };
  const onupdate = (e) => {
    e.preventDefault();
    const data = { ...current, title, message };
    updatePost(dispatch, data);
    setCurrentValue(dispatch, null);
    setTitle("");
    setMessage("");
  };

  return (
    <Container>
      <StyledPopup
        trigger={
          <button
            className={current ? "update" : "btn"}
            title='Click to add post'
          >
            {" "}
            {current ? `Update your post` : "Add What is on your mind!!!"}
          </button>
        }
        position='bottom'
        modal
        closeOnDocumentClick
        style={{ width: "96%" }}
      >
        <Forms onSubmit={current ? onupdate : onsubmit}>
          <Grid>
            <div style={{ paddingLeft: "0.5em" }}>
              {/* <Logo>
                {user !== null ? user.username.slice(0, 2).toUpperCase() : "OO"}
              </Logo> */}
              <Logo style={{ cursor: "pointer" }}>
                {user !== null ? (
                  <Image>
                    <img src={JSON.parse(user.image_url)[0]} />
                  </Image>
                ) : user !== null ? (
                  user.username.slice(0, 2).toUpperCase()
                ) : (
                  "OO"
                )}
              </Logo>
            </div>
            <div>
              <FormGroup
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "0.5em",
                }}
              >
                <select className='select' onChange={handleSelect}>
                  <option value='Post'>Post</option>
                  <option value='Dev'>Dev</option>
                  <option value='Article'>Article</option>
                  <option value='Question'>Question</option>
                </select>
                <input
                  type='text'
                  name='title'
                  className='input'
                  placeholder='Your Post Title!!!'
                  onChange={handleInput}
                  value={title}
                />
              </FormGroup>
              {/* <Editor tag='textarea' onModelChange={setMessage} /> */}
              <Form.Field
                style={{ marginBottom: "0 !important" }}
                control={TextArea}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Write your Post here!!!'
                value={message}
              />
              <Button
                className='btn'
                type='submit'
                color='blue'
                style={{ marginTop: "0.8em" }}
              >
                <Icon name='comment' /> {current ? "Update Post" : "Post"}
              </Button>
              {current && (
                <Button
                  onClick={() => {
                    setCurrentValue(dispatch, null);
                    setTitle("");
                    setMessage("");
                  }}
                >
                  Clear Fields
                </Button>
              )}
            </div>
          </Grid>
        </Forms>
      </StyledPopup>
      <Icon
        name='sync'
        size='big'
        color='grey'
        title='Reload page'
        onClick={() => window.location.reload()}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .popup-content {
    width: 60% !important;
    position: absolute !important;
    left: 20%;
    bottom: 1px !important;
  }

  .btn {
    padding: 0.6em 1.5em;
    background: dodgerblue;
    color: white;
  }
  .update {
    padding: 0.6em 1.5em;
    background: teal;
    color: white;
    border: none;
    border-radius: 0.2em;
  }

  @media (max-width: 769px) {
    padding: 1em;
    .popup-content {
      width: 100% !important;
      left: 0;
      bottom: 1px !important;
    }
  }
`;

const StyledPopup = styled(Popup)`
  width: 100%;
`;

export const Forms = styled(Form)`
  padding: 2% 0em 2% 0em;
  width: 100%;
  border-radius: 0.4em;
  overflow: hidden;

  .second-toolbar {
    display: none;
  }
  .third-toolbar {
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-top: 0;
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    padding: 1em;
    display: flex;
    justify-content: flex-end;
  }

  @media (max-width: 769px) {
    padding: 1em;
  }
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 7% 93%;

  @media (max-width: 1400px) {
    grid-template-columns: 15% 85%;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 15% 85%;
  }
  @media (max-width: 769px) {
    grid-template-columns: 17% 83%;
  }

  .field {
    margin-bottom: 0 !important;
  }

  .field textarea {
    border: none !important;
    border-top: 1px solid #ccc !important;
    border-bottom: 1px solid #ccc !important;
  }

  .input {
    width: 100%;
    padding: 0.4em;
    border: none !important;
    /* border-radius: 0.3em; */
    outline: none;
  }

  .select {
    padding: 0.4em 0.3em;
    width: 100px !important;
    margin-right: 1em;
    border: 0.5px solid #ccc;
    border-radius: 0.3em;
    outline: none;

    option {
      background: #f9fbfc;
      border-radius: 0.2em;
    }
  }
`;

export default PostForm;
