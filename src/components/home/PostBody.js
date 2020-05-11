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
          <H1>Posted By @{post.username}</H1>
        </Flex>
        <Flex paddingBottom='1em'>
          <H1 paddingRight='10%'>{post.body}</H1>
        </Flex>
        <Flex paddingBottom='1em'>
          <p>Posted {moment(post.createdAt).fromNow(true)} </p>
        </Flex>
        <Buttons>
          {token ? (
            <Button as='div' labelPosition='right' onClick={handleLikes}>
              <Button icon color='red'>
                <Icon name='heart' />
              </Button>
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
          <div>
            {token && post.username === user.username && (
              <Icon
                name='trash'
                size='big'
                color='red'
                onClick={handleDelete}
                style={{ marginRight: "1em", cursor: "pointer" }}
              />
            )}
            <Link to={`/comments/${post._id}`}>
              <Button as='div' labelPosition='left'>
                <Label as='a' basic color='blue'>
                  {post.comments.length}
                </Label>
                <Button icon color='blue'>
                  <Icon name='comments' />
                </Button>
              </Button>
            </Link>
          </div>
        </Buttons>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 0.5rem 10% 0 10%;

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
  font-size: 1.5rem;
  color: #777;
  i {
    color: teal;
  }
`;

export default PostCard;
