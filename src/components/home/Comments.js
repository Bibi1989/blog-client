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
import { useContext } from "react";
import { UserContext } from "../userContext/UserProvider";

const Comments = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  let { getAllUsersNotFilter, users } = useContext(UserContext);
  users = users !== null && [...users];

  const { commentId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
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
  // console.log(comments);
  useEffect(() => {
    getComments(dispatch, commentId);
    getAPost(dispatch, commentId);
    getAllUsersNotFilter();

    // eslint-disable-next-line
  }, [added_comment, likes]);
  let notice = "";

  const handleComment = ({ target: { value } }) => {
    setComment(value);
    if (value === "@") {
      setShow(true);
    }
    if (value === "@Bibi") {
      setShow(false);
    }
  };

  const handleLikes = (id) => {
    likePost(dispatch, id);
    if (post !== null && post.username === user.username) {
      notice = `You Liked on your own post`;
    } else {
      notice = `${user.username} Liked your post`;
    }

    createNotification(dispatch, notice, Number(post !== null && post.User.id));
  };

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
                    <img src={post.User.image_url} alt='logo' />
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
          {show && (
            <OverlayPopup>
              {users !== null &&
                users.map((user) => (
                  <Flex
                    flex='row'
                    onClick={() => {
                      setComment(`@${user.username}`);
                      setShow(false);
                    }}
                  >
                    <Logo>{user.username.slice(0, 2).toUpperCase()}</Logo>
                    <p>{user.username}</p>
                  </Flex>
                ))}
            </OverlayPopup>
          )}
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
          {(comments !== null || comments.length !== 0) &&
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
  padding: ${({ flex }) => (flex ? "0.5em" : "1em 0 0 0")};
  position: relative;
  display: ${({ flex }) => flex && "flex"};
  border-bottom: ${({ flex }) => flex && "1px solid #cccccc"};
`;
const OverlayPopup = styled.div`
  width: 30%;
  background: #f1f1f1;
  position: absolute;
  top: 1em;
  left: 3em;
  max-height: 400px;
  overflow-y: auto;
  z-index: 10;

  &::-webkit-scrollbar {
    /* display: none; */
    width: 3px;
  }

  p {
    margin: 0;
    padding: 0.5em;
  }
`;
