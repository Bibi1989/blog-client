import React from "react";
import moment from "moment";
import { Logo, Image } from "../home/PostBody";
import { Comment, Icon, Button } from "semantic-ui-react";
import { deletePost } from "../BlogRedux/store";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

const ProfileCard = ({ user, post, allPost }) => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  if (show) {
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>You want to delete a post</Alert.Heading>
        <p>{`${user.username} are you sure of this this post?`}</p>
        <Button color='red' onClick={() => setShow(false)}>
          No
        </Button>
        <Button color='teal' onClick={() => deletePost(dispatch, post.id)}>
          Yes
        </Button>
      </Alert>
    );
  }

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
                {allPost !== undefined && allPost.tags}
              </span>
            </Comment.Action>
            <Comment.Action>
              <Icon name='heart' />
              Like {user !== null && user.Likes.length}
            </Comment.Action>
            <Comment.Action>
              <Icon name='envelope open' />
              Comment {user !== null && user.Comments.length}
            </Comment.Action>
            <Comment.Action>
              {moment(allPost !== undefined && allPost.createdAt).fromNow(true)}{" "}
              ago
            </Comment.Action>
            <Comment.Action onClick={() => setShow(true)}>
              <Icon name='trash' />
              Delete This Post {user !== null && user.Comments.length}
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export default ProfileCard;
