import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Form } from "./PostForm";
import { Icon, Button, Label } from "semantic-ui-react";
import { getAPost, createComment } from "../BlogRedux/store";
import { Buttons, H1, Logo } from "./PostBody";
import { Loader } from "./Post";
import { Spinner } from "react-bootstrap";

const Comments = () => {
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const [form, setForm] = useState("");
  const post = useSelector(({ posts: { post } }) => post);
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  const loading = useSelector(({ posts: { loading } }) => loading);
  useEffect(() => {
    getAPost(dispatch, commentId);
  }, [added_comment]);
  const handleInput = (e) => {
    const { value, name } = e.target;
    console.log(value);
    setForm(value);
  };
  console.log({ post });

  const onsubmit = (e) => {
    e.preventDefault();

    createComment(dispatch, form, commentId);
    setForm({
      body: "",
    });
  };
  return (
    <Container>
      <Row>
        <div className='post'>
          <Flex justify='flex-start'>
            <Logo>
              {post !== null && post.username.slice(0, 2).toUpperCase()}
            </Logo>
            <H1>{post !== null && `Posted By @${post.username}`}</H1>
          </Flex>
          <H1>{post !== null && post.body}</H1>
          <Buttons>
            <Button as='div' style={{ background: "white" }}>
              <Icon name='heart' size='large' />
              <Label as='a' basic pointing='left' color='red'>
                {post !== null && post.likes.length}
              </Label>
            </Button>
            <Button as='div' style={{ background: "white" }}>
              <Icon name='comments' size='large' />
              <Label as='a' basic pointing='left' color='blue'>
                {post !== null && post.comments.length}
              </Label>
            </Button>
          </Buttons>
        </div>
      </Row>
      <Form onSubmit={onsubmit}>
        <div className='input-group'>
          <Icon name='comment' className='icon' size='big' />
          <input
            type='text'
            name='body'
            placeholder='Comment on this post!!!'
            onChange={handleInput}
          />
        </div>
        <Button className='btn' type='submit' color='blue'>
          <Icon name='comment' /> Comment
        </Button>
      </Form>
      <Loader>
        {loading && <Spinner animation='border' className='loading' />}
      </Loader>
      <Grid>
        {post !== null &&
          post.comments.map((comment) => (
            <Comment comment={comment !== null && comment} />
          ))}
      </Grid>
    </Container>
  );
};

export const Container = styled.div``;
export const SubGrid = styled.div`
  max-width: 80%;
  background: #ffffff;
  margin: auto;
  padding: 1em;
  border-radius: 0.8em;
  margin-bottom: 0.8em;

  @media (max-width: 768px) {
    max-width: 96%;
  }
`;
export const Row = styled.div`
  padding: 2% 10%;

  @media (max-width: 768px) {
    padding: 1em;
  }

  .post {
    background: #ffffff;
    padding: 1em;
    border-radius: 0.8em;
  }
`;
export const Grid = styled.div`
  height: 60vh;
  padding-bottom: 3em;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: teal;
  }
`;
const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: center;
`;
// export const H1 = styled.h1``;

export default Comments;

const Comment = ({ comment }) => (
  <SubGrid>
    <div className='user'>
      <div>
        <p>{comment.username}</p>
        <div className='body'>
          <p style={{ paddingBottom: "1em" }}>{comment.body}</p>
        </div>
        <p className='date'>
          <span>
            {moment(comment.createdAt).fromNow(true)}{" "}
            <i className='fas fa-users'></i>
          </span>
        </p>
      </div>
    </div>
  </SubGrid>
);
