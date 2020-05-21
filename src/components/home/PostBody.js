import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon, Comment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  likePost,
  createNotification,
  setCurrentValue,
} from "../BlogRedux/store";
import { styleFunc } from "./tagStyle";

const PostCard = ({ post }) => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  let image = token ? JSON.parse(user.image_url)[0] : "";
  const dispatch = useDispatch();

  const history = useHistory();
  let notice = "";

  const handleLikes = (id) => {
    likePost(dispatch, id);
    if (post !== null && post.username === user.username) {
      notice = `You commented on your own post`;
    } else {
      notice = `${user.username} commented on your post`;
    }

    createNotification(dispatch, notice, Number(post !== null && post.User.id));
  };
  const handleComment = () => {
    history.push(`/comments/${post.id}`);
  };
  // console.log({ user: JSON.parse(user.image_url)[0] });
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
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post.User.id}`)}
              title={`View ${post.User.username} Profile`}
            >
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
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post.User.id}`)}
              title={`View ${post.User.username} Profile`}
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
              title={`View ${post.User.username} Comments`}
            >
              <span>{post.title}</span>
            </Comment.Text>
            <Comment.Actions>
              <Comment.Action>
                <span style={styleFunc(post.tags)}>{post.tags}</span>
              </Comment.Action>
              <Comment.Action
                onClick={() => handleLikes(post.id)}
                title={`Like ${post.User.username} Post`}
              >
                <Icon
                  name='heart'
                  color={
                    user !== null && user.email && post.Likes.length
                      ? "red"
                      : "gray"
                  }
                />
                Like {post.Likes.length}
              </Comment.Action>
              <Comment.Action
                onClick={handleComment}
                title={`View ${post.User.username} Comments`}
              >
                <Icon name='envelope open' />
                Comment {post.Comments.length}
              </Comment.Action>
              <Comment.Action>
                {moment(post.createdAt).fromNow(true)} ago
              </Comment.Action>
              {token && user.id === post.User.id && (
                <Comment.Action
                  onClick={() => setCurrentValue(dispatch, post)}
                  title={`Edit Your Post`}
                >
                  <Icon name='edit outline' /> Edit Post
                </Comment.Action>
              )}
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
export const Image = styled.div`
  width: ${(props) => (props.width ? props.width : "40px")};
  height: ${(props) => (props.width ? props.width : "40px")};
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
export const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.flexDirection ? props.flexDirection : "row"};
  justify-content: ${(props) => (props.justify ? props.justify : "")};
  align-items: ${(props) => (props.flexDirection ? "flex-start" : "center")};

  .user_post {
    padding-top: 0.5em;
    line-height: 100%;

    .num {
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      text-align: center;
      line-height: 15px;
      color: white;
      font-size: 0.7em;
      background: orangered;
    }
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
