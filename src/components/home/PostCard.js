import React, { useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon, Comment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  createNotification,
  setCurrentValue,
} from "../BlogRedux/store";
import { styleFunc } from "./tagStyle";

const PostCard = ({ post }) => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();

  const history = useHistory();
  let notice = "";

  const likes = useSelector(({ posts: { likes } }) => likes);

  useEffect(() => {}, [likes]);

  const handleLikes = (id) => {
    if (!token) {
      history.push("/login");
    } else {
      likePost(dispatch, id);
      if (post !== null && post.username === user.username) {
        notice = `You commented on your own post`;
      } else {
        notice = `${user.username} commented on your post`;
      }
    }

    createNotification(dispatch, notice, Number(post !== null && post.User.id));
  };
  const handleComment = () => {
    if (!token) {
      history.push("/login");
    } else {
      history.push(`/comments/${post.id}`);
    }
  };

  return (
    <Container>
      <Comment.Group style={{ width: "100%" }}>
        <CommentStyle
        >
          <Comment.Content className='lgo'>
            <Logo
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post.userId}`)}
              title={`View ${post.username} Profile`}
            >
              {post.User.image_url ? (
                <Image>
                  <img src={post.User.image_url} alt='logo' />
                </Image>
              ) : (
                post.User.username.slice(0, 2).toUpperCase()
              )}
            </Logo>
          </Comment.Content>
          <Flex flexDirection='column'>
            <Comment.Author
              style={{ cursor: "pointer", paddingBottom: "1.5em" }}
              onClick={() => history.push(`/profile/${post.userId}`)}
              title={`View ${post.username} Profile`}
            >
              {post.username}
            </Comment.Author>
            <Comment.Content>
              <ImageLoad>
                {post.image_url && (
                  <InnerDiv>
                    <img src={post.image_url} alt='' />
                  </InnerDiv>
                )}
              </ImageLoad>
            </Comment.Content>
            <Comment.Content>
              <Comment.Text
                onClick={handleComment}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  paddingTop: "1.3em",
                }}
                title={`View ${post.username} Comments`}
              >
                <span>{post.title}</span>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>
                  <span style={styleFunc(post.tags)}>{post.tags}</span>
                </Comment.Action>
                <Comment.Action
                  onClick={() => handleLikes(post.id)}
                  title={`Like ${post.username} Post`}
                  style={{
                    color: `${
                      user !== null &&
                      post.Comments.some(
                        (comment) => comment.userId === user.id
                      )
                        ? "orangered"
                        : "#999999"
                    }`,
                  }}
                >
                  <Icon
                    name='heart'
                    color={
                      user !== null &&
                      post.Likes.some((like) => like.userId === user.id)
                        ? "red"
                        : "#999999"
                    }
                  />
                  Like {post.Likes.length}
                </Comment.Action>
                <Comment.Action
                  onClick={handleComment}
                  title={`View ${post.username} Comments`}
                  style={{
                    color: `${
                      user !== null &&
                      post.Comments.some(
                        (comment) => comment.userId === user.id
                      )
                        ? "dodgerblue"
                        : "#999999"
                    }`,
                  }}
                >
                  <Icon
                    name='envelope open'
                    color={
                      user !== null &&
                      post.Comments.some(
                        (comment) => comment.userId === user.id
                      )
                        ? "blue"
                        : "#999999"
                    }
                  />
                  Comment {post.Comments.length}
                </Comment.Action>
                <Comment.Action>
                  {moment(post.createdAt).fromNow(true)} ago
                </Comment.Action>
                {token && user.id === post.userId && (
                  <Comment.Action
                    onClick={() => setCurrentValue(dispatch, post)}
                    title={`Edit Your Post`}
                    style={{ color: "teal" }}
                  >
                    <Icon name='edit outline' color='teal' /> Edit Post
                  </Comment.Action>
                )}
              </Comment.Actions>
            </Comment.Content>
          </Flex>
        </CommentStyle>
      </Comment.Group>
    </Container>
  );
};

const Container = styled.div`
  padding: 2em;
  margin: 0;
  border-bottom: 0.5px solid #eee;

  @media (max-width: 769px) {
    padding: 1em;
  }
`;
const CommentStyle = styled(Comment)`
  display: grid;
  grid-template-columns: 10% 90%;
  gap: 1em;
  padding-right: 1em;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`
const ImageLoad = styled.div``;
const InnerDiv = styled.div`
  width: 90%;
  max-height: 300px;
  margin-right: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0.3em;
  overflow: hidden;

  img {
    width: 100%;
  }

  @media (max-width: 800px) {
    width: 100%;
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
