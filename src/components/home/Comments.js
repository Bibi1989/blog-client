import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Icon, Comment, TextArea, Form, Button } from "semantic-ui-react";
import {
  getComments,
  createComment,
  getAPost,
  createNotification,
  likePost,
} from "../BlogRedux/store";
import { Logo, Image } from "./PostBody";
import { Spinner } from "react-bootstrap";
import CommentCard from "./CommentCard";
import { Loader } from "./Post";
import { styleFunc } from "./tagStyle";

const Comments = () => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  let image = token ? JSON.parse(user.image_url)[0] : "";
  const { commentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  // const [notice, setNotice] = useState("");
  const post = useSelector(({ posts: { post } }) => post);
  const comments = useSelector(({ posts: { comments } }) => comments);
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  const likes = useSelector(({ posts: { likes } }) => likes);
  const comment_loading = useSelector(
    ({ posts: { comment_loading } }) => comment_loading
  );
  useEffect(() => {
    getComments(dispatch, commentId);
    getAPost(dispatch, commentId);

    // eslint-disable-next-line
  }, [added_comment, likes]);

  const handleComment = ({ target: { value } }) => {
    setComment(value);
  };

  const handleLikes = (id) => {
    likePost(dispatch, id);
  };

  let notice = "";

  const onsubmit = (e) => {
    e.preventDefault();
    if (post !== null && post.username === user.username) {
      notice = `You commented on your own post`;
    } else {
      notice = `${user.username} commented on your post`;
    }

    createComment(dispatch, comment, commentId);
    createNotification(dispatch, notice, Number(post !== null && post.User.id));
    setComment("");
  };

  return (
    <Container>
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
            <Comment.Content
              onClick={() =>
                history.push(`/profile/${post !== null && post.User.id}`)
              }
              style={{ cursor: "pointer" }}
            >
              {/* <Logo>
                {post !== null && post.User.username.slice(0, 2).toUpperCase()}
              </Logo> */}

              <Logo style={{ cursor: "pointer" }}>
                {post !== null && post.User.image_url ? (
                  <Image>
                    <img src={JSON.parse(post.User.image_url)[0]} />
                  </Image>
                ) : (
                  post !== null && post.User.username.slice(0, 2).toUpperCase()
                )}
              </Logo>
            </Comment.Content>
            <Comment.Content>
              <Comment.Author
                onClick={() =>
                  history.push(`/profile/${post !== null && post.User.id}`)
                }
              >
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
                  <span style={styleFunc(post !== null && post.tags)}>
                    {post !== null && post.tags}
                  </span>
                </Comment.Action>
                <Comment.Action
                  onClick={() => handleLikes(post !== null && post.id)}
                >
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

      <Flex>
        <Form onSubmit={onsubmit}>
          <Form.Field
            control={TextArea}
            onChange={handleComment}
            placeholder='Write your comment here!!!'
            value={comment}
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
  padding: 1em;
  min-height: 93vh;
`;
const Flex = styled.div`
  padding-top: 1em;
`;
