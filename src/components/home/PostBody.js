import React from "react";
import moment from "moment";
import styled from "styled-components";
import { Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../BlogRedux/store";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const handleLikes = () => {
    likePost(dispatch, post._id);
  };
  return (
    <Container>
      <Row>
        <Flex>
          <H1>{post.body}</H1>
          <span>{moment(post.createdAt).fromNow(true)} </span>
        </Flex>
        <Buttons>
          <Button as='div' labelPosition='right' onClick={handleLikes}>
            <Button icon color='red'>
              <Icon name='heart' />
            </Button>
            <Label as='a' basic pointing='left' color='red'>
              {post.likes.length}
            </Label>
          </Button>
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
  display: flex;
  justify-content: space-between;
`;

export const H1 = styled.h1`
  font-size: 1.5rem;
  color: #777;
  i {
    color: teal;
  }
`;

export default PostCard;
