import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Icon, Comment, TextArea, Form, Button } from "semantic-ui-react";
import { getComments, createComment, getAPost } from "../BlogRedux/store";
import { Logo } from "./PostBody";
import { Spinner } from "react-bootstrap";
import CommentCard from "./CommentCard";
import { Loader } from "./Post";

const Comments = () => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { commentId } = useParams();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const post = useSelector(({ posts: { post } }) => post);
  const comments = useSelector(({ posts: { comments } }) => comments);
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  const comment_loading = useSelector(
    ({ posts: { comment_loading } }) => comment_loading
  );
  const loading = useSelector(({ posts: { loading } }) => loading);
  useEffect(() => {
    getComments(dispatch, commentId);
    getAPost(dispatch, commentId);
  }, [added_comment]);

  const handleComment = ({ target: { value } }) => {
    setComment(value);
  };

  const onsubmit = (e) => {
    e.preventDefault();

    createComment(dispatch, comment, commentId);
    setComment("");
  };

  console.log({ comment });

  return (
    <Container>
      {loading ? (
        <Loader padding='2em'>
          {loading && <Spinner animation='border' variant='primary' />}
        </Loader>
      ) : (
        <Flex>
          <Comment.Group style={{ width: "100%" }}>
            <Comment
              style={{
                width: "100%",
                display: "flex",
                margin: "0 !important",
                padding: "0 !important",
              }}
            >
              <Comment.Content>
                <Logo>
                  {post !== null &&
                    post.User.username.slice(0, 2).toUpperCase()}
                </Logo>
              </Comment.Content>
              <Comment.Content>
                <Comment.Author>
                  {post !== null && post.User.username}
                </Comment.Author>
                <Comment.Text
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                  }}
                >
                  <h2 style={{ paddingBottom: "1em" }}>
                    {post !== null && post.title}
                  </h2>
                  <span>{post !== null && post.message}</span>
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action>
                    <span
                      style={{
                        padding: "0em 0.5em 0.2em 0.5em",
                        background: "orangered",
                        color: "white",
                        borderRadius: "0.2em",
                      }}
                    >
                      {post !== null && post.tags}
                    </span>
                  </Comment.Action>
                  <Comment.Action>
                    <Icon name='heart' />
                    Like {post !== null && post.Likes.length}
                  </Comment.Action>
                  <Comment.Action>
                    <Icon name='envelope open' />
                    Comment {post !== null && post.Comments.length}
                  </Comment.Action>
                  <Comment.Action>
                    {moment(post !== null && post.createdAt).fromNow(true)} ago
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Flex>
      )}

      <Flex>
        <Form onSubmit={onsubmit}>
          <Form.Field
            control={TextArea}
            onChange={handleComment}
            placeholder='Write your comment here!!!'
          />
          <Button type='submit' color='blue'>
            Comment
          </Button>
        </Form>
      </Flex>
      {comment_loading ? (
        <Loader padding='2em'>
          {comment_loading && <Spinner animation='border' variant='primary' />}
        </Loader>
      ) : (
        <Flex>
          {comments !== null &&
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
        </Flex>
      )}
    </Container>
  );
};

export default Comments;

const Container = styled.div`
  min-height: 93vh;
`;
const Flex = styled.div`
  padding-top: 1.5em;
`;
