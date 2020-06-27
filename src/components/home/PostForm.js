import React, { useState } from "react";
import styled from "styled-components";
import {
  addPost,
  updatePost,
  setCurrentValue,
  postPhoto,
} from "../BlogRedux/store";
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

  // photo upload
  const [titlePhoto, setTitlePhoto] = useState("");
  const [messagePhoto, setMessagePhoto] = useState("");
  const [selectPhoto, setSelectPhoto] = useState("Post");
  const [file, setFile] = useState("Post");

  const history = useHistory();
  const dispatch = useDispatch();
  const current = useSelector(({ posts: { current } }) => current);
  const update = useSelector(({ posts: { update } }) => update);
  const post_error = useSelector(({ posts: { post_error } }) => post_error);
  const [show, setShow] = useState(true);
  const [showForm, setShowForm] = useState("Post");
  useEffect(() => {
    if (current !== null) {
      setTitle(current.title);
      setMessage(current.message);
    }
  }, [current, update, post_error]);

  const handleInput = (e) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleSelect = (e) => {
    const { value } = e.target;
    setSelect(value);
  };
  const handleInputPhoto = (e) => {
    const { value } = e.target;
    setTitlePhoto(value);
  };

  const handleSelectPhoto = (e) => {
    const { value } = e.target;
    setSelectPhoto(value);
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
    const data = { ...current, title, message, tags: select };
    updatePost(dispatch, data);
    setCurrentValue(dispatch, null);
    setTitle("");
    setMessage("");
  };

  const onsubmitPhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", titlePhoto);
    formData.append("message", messagePhoto);
    formData.append("tags", selectPhoto);

    postPhoto(dispatch, formData, history);
    setShow(true);
    setTitle("");
    setMessage("");
  };
  const onupdatePhoto = (e) => {
    e.preventDefault();
    const data = { ...current, title, message, tags: select };
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
        <Flex>
          <Button onClick={() => setShowForm("Post")}>Post Something</Button>
          <Button onClick={() => setShowForm("Pic")}>Upload Photo Post</Button>
        </Flex>
        {showForm === "Post" && (
          <Forms onSubmit={current ? onupdate : onsubmit}>
            <Grid>
              <div style={{ paddingLeft: "0.5em" }}>
                <Logo style={{ cursor: "pointer" }}>
                  {user !== null && user.image_url ? (
                    <Image>
                      <img src={user.image_url} alt='logo' />
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
        )}
        {showForm === "Pic" && (
          <Forms onSubmit={current ? onupdatePhoto : onsubmitPhoto}>
            <Grid>
              <div style={{ paddingLeft: "0.5em" }}>
                <Logo style={{ cursor: "pointer" }}>
                  {user !== null && user.image_url ? (
                    <Image>
                      <img src={user.image_url} alt='logo' />
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
                  <select className='select' onChange={handleSelectPhoto}>
                    <option value='Post'>Post</option>
                    <option value='Dev'>Dev</option>
                    <option value='Article'>Article</option>
                    <option value='Question'>Question</option>
                  </select>
                  <input
                    type='text'
                    name='titlePhoto'
                    className='input'
                    placeholder='Your Post Title!!!'
                    onChange={handleInputPhoto}
                    value={titlePhoto}
                  />
                </FormGroup>
                {/* <Editor tag='textarea' onModelChange={setMessage} /> */}
                <FormGroup style={{ margin: "10px 0" }}>
                  <input
                    type='file'
                    name='file'
                    className='input'
                    placeholder='Post a photo'
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>
                <Form.Field
                  style={{ marginBottom: "0 !important" }}
                  control={TextArea}
                  onChange={(e) => setMessagePhoto(e.target.value)}
                  placeholder='Write your Post here!!!'
                  value={messagePhoto}
                />
                <Button
                  className='btn'
                  type='submit'
                  color='blue'
                  style={{ marginTop: "0.8em" }}
                >
                  <Icon name='comment' />{" "}
                  {current ? "Update Post Photo" : "Post Photo"}
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
        )}
      </StyledPopup>
      <Icon
        name='sync'
        size='big'
        color='grey'
        title='Reload page'
        style={{ cursor: "pointer" }}
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

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em;
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
