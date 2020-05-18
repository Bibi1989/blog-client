import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon, Comment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost, updatePost, getAPost } from "../BlogRedux/store";

const PostCard = ({ post }) => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLikes = (id) => {
    likePost(dispatch, id);
  };
  const handleComment = () => {
    history.push(`/comments/${post.id}`);
  };
  const handleDelete = () => {
    deletePost(dispatch, post.id);
  };
  return (
    <Container>
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
            <Logo
              onClick={() => history.push(`/profile/${post.User.id}`)}
              style={{ cursor: "pointer" }}
            >
              {post.User.username.slice(0, 2).toUpperCase()}
            </Logo>
          </Comment.Content>
          <Comment.Content>
            <Comment.Author
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post.User.id}`)}
            >
              {post.User.username}
            </Comment.Author>
            <Comment.Text
              onClick={handleComment}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <span>{post.title}</span>
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
                  {post.tags}
                </span>
              </Comment.Action>
              <Comment.Action onClick={() => handleLikes(post.id)}>
                <Icon
                  name='heart'
                  color={
                    user !== null &&
                    user.email === post.User.email &&
                    post.Likes.length
                      ? "red"
                      : "gray"
                  }
                />
                Like {post.Likes.length}
              </Comment.Action>
              <Comment.Action onClick={handleComment}>
                <Icon name='envelope open' />
                Comment {post.Comments.length}
              </Comment.Action>
              <Comment.Action>
                {moment(post.createdAt).fromNow(true)} ago
              </Comment.Action>
              <Comment.Action>
                <Icon
                  name='edit outline'
                  onClick={() => getAPost(dispatch, post.id)}
                />{" "}
                Edit Post
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Container>
  );
};

const Container = styled.div`
  padding: 2em;
  margin: 0;

  @media (max-width: 769px) {
    padding: 1em;
  }
`;
export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div`
  padding: 1em;
  background: #ffffff;
  box-shadow: 0 5px 25px #eee;
  display: grid;
  grid-template-columns: 10% 90%;
`;
export const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: center;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : ""};

  span {
    text-align: right;
  }
`;

export const H1 = styled.h1`
  font-size: 1rem;
  color: #777;
  i {
    color: teal;
  }
`;
export const H2 = styled.h2`
  font-size: 1em;
  margin: 0;
  padding: 0;
  line-height: 100%;
  color: #777;
  i {
    color: teal;
  }
`;
export const Logo = styled.div`
  width: ${(props) => (props.width ? props.width : "40px")};
  height: ${(props) => (props.width ? props.width : "40px")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.width ? "1.3em" : "1em")};
  margin-right: 1em;
  background: #2285d0;
  color: #fff;
`;

export default PostCard;
