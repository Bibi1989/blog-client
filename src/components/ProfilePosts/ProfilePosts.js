import React, { useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { Icon, Comment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersPosts } from "../BlogRedux/store";
import { styleFunc } from "../home/tagStyle";

const ProfilePosts = () => {
  const token = sessionStorage.getItem("blog");
  const dispatch = useDispatch();
  const userPosts = useSelector(({ posts: { user_post } }) => user_post);
  useEffect(() => {
    getUsersPosts(dispatch);
  }, []);
  console.log({ userPosts });
  return (
    <Container>
      {userPosts !== null &&
        userPosts.map((post) => (
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
                {/* <Logo
                  style={{ cursor: "pointer" }}
                  title={`View ${post.User.username} Profile`}
                >
                  {post !== null && post.User.image_url ? (
                    <Image>
                      <img src={JSON.parse(post.User.image_url)[0]} />
                    </Image>
                  ) : (
                    post !== null &&
                    post.User.username.slice(0, 2).toUpperCase()
                  )}
                </Logo> */}
              </Comment.Content>
              <Comment.Content>
                <Comment.Author
                  style={{ cursor: "pointer" }}
                  title={`View ${post.User.username} Profile`}
                >
                  {post.User.username}
                </Comment.Author>
                <Comment.Text
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
                  <Comment.Action title={`Like ${post.User.username} Post`}>
                    <Icon name='heart' />
                    Like {post.Likes.length}
                  </Comment.Action>
                  <Comment.Action title={`View ${post.User.username} Comments`}>
                    <Icon name='envelope open' />
                    Comment {post.Comments.length}
                  </Comment.Action>
                  <Comment.Action>
                    {moment(post.createdAt).fromNow(true)} ago
                  </Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        ))}
    </Container>
  );
};

export default ProfilePosts;

const Container = styled.div`
  min-height: 93vh;
  padding: 3% 0;
`;
