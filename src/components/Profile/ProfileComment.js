import React from "react";
import moment from "moment";
import { Logo, Image } from "../home/PostBody";
import { Comment, Icon } from "semantic-ui-react";

const ProfileComment = ({ user, post, allPost }) => {
  console.log(post);
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
            {user !== null && user.image_url ? (
              <Image>
                <img src={JSON.parse(user.image_url)[0]} />
              </Image>
            ) : (
              post !== null && post.User.username.slice(0, 2).toUpperCase()
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
              <span
                style={{
                  padding: "0em 0.5em 0.2em 0.5em",
                  background: "orangered",
                  color: "white",
                  borderRadius: "0.2em",
                }}
              >
                {allPost !== undefined && allPost.tags}
              </span>
            </Comment.Action>
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