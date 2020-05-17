import React from "react";
import { Comment, Icon } from "semantic-ui-react";
import moment from "moment";
import { Logo } from "./PostBody";
import { Loader } from "./Post";
import { Spinner } from "react-bootstrap";

const CommentCard = ({ comment }) => {
  console.log(comment);
  return (
    <Comment.Group style={{ width: "100%" }}>
      <Loader padding='2em'>
        {loading && <Spinner animation='border' variant='primary' />}
      </Loader>
      <Comment
        style={{
          width: "100%",
          display: "flex",
          margin: "0 !important",
          padding: "0 !important",
        }}
      >
        <Comment.Content>
          <Logo>{comment.User.username.slice(0, 2).toUpperCase()}</Logo>
        </Comment.Content>
        <Comment.Content>
          <Comment.Author>{comment.User.username}</Comment.Author>
          <Comment.Text
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{comment.message}</span>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              {moment(comment.createdAt).fromNow(true)} ago
            </Comment.Action>
            <Comment.Action>
              <Icon name='edit outline' /> Edit Comment
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default CommentCard;
