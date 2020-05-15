import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost } from "../BlogRedux/store";

const PostCard = ({ post }) => {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const handleLikes = () => {
    likePost(dispatch, post._id);
  };
  const handleDelete = () => {
    deletePost(dispatch, post._id);
  };
  return (
    <Container>
      <Row>
        <Flex paddingBottom='1em'>
          <H2>Posted By @{post.username}</H2>
        </Flex>
        <Flex paddingBottom='1em'>
          <H1 paddingRight='10%'>{post.body}</H1>
        </Flex>
        <Flex paddingBottom='0em'>
          <p style={{ color: "#bbbbbb" }}>
            Posted {moment(post.createdAt).fromNow(true)}{" "}
          </p>
        </Flex>
        <Buttons>
          {token ? (
            <Button
              as='div'
              onClick={handleLikes}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
              }}
            >
              <Icon name='heart' size='large' />
              <Label as='a' basic pointing='left' color='red'>
                {post.likes.length}
              </Label>
            </Button>
          ) : (
            <Link to='/login'>
              <Button as='div' labelPosition='right' onClick={handleLikes}>
                <Button icon color='red'>
                  <Icon name='heart' />
                </Button>
                <Label as='a' basic pointing='left' color='red'>
                  {post.likes.length}
                </Label>
              </Button>
            </Link>
          )}
          <div style={{ display: "flex", alignItems: "center" }}>
            {token && post.username === user.username && (
              <Icon
                name='trash'
                size='large'
                color='red'
                onClick={handleDelete}
                style={{ marginRight: "1em", cursor: "pointer" }}
              />
            )}
            <Link to={`/comments/${post._id}`}>
              <div>
                <Icon name='comments' size='large' />
                <Label as='a' basic pointing='left' color='blue'>
                  {post.comments.length}
                </Label>
              </div>
            </Link>
          </div>
        </Buttons>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem 1em 0 5em;

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
  border-radius: 0.7em;
  background: #ffffff;
  box-shadow: 0 5px 25px #eee;
`;
const Flex = styled.div`
  display: grid;
  grid-template-columns: 90% 10%;
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
  font-size: 0.8rem;
  color: #777;
  i {
    color: teal;
  }
`;

export default PostCard;
