import React from "react";
import moment from "moment";
import { Logo, Image } from "../home/PostBody";
import { Comment } from "semantic-ui-react";

const ProfileComment = ({ user, post }) => {
  console.log({ post, user });
  return (
    <Comment.Group style={{ width: "100%" }} key={post.id}>
      <Comment
        style={{
          width: "100%",
          display: "flex",
          margin: "0 !important",
          padding: "0 !important",
        }}
      >
        <Comment.Content>
          <Logo style={{ cursor: "pointer" }}>
            {(user !== null || user !== undefined) && user.image_url ? (
              <Image>
                <img src={user.image_url} alt='logo' />
              </Image>
            ) : (
              <Image>
                <img src='../../../avatar.png' alt='profile logo' />
              </Image>
            )}
          </Logo>
        </Comment.Content>
        <Comment.Content>
          <Comment.Author>{user !== null && user.username}</Comment.Author>
          <Comment.Text
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <span>{post.message}</span>
          </Comment.Text>
          <Comment.Actions>
            <Comment.Action>
              {moment(post.createdAt).fromNow(true)} ago
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default ProfileComment;
