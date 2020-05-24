import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import { Logo, Image } from "../home/PostBody";
import { UserContext } from "../userContext/UserProvider";
import ProfileCard from "./ProfileCard";
import ProfileComment from "./ProfileComment";
import { Icon, Label } from "semantic-ui-react";
import { Spinner, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createNotification } from "../BlogRedux/store";

const Profile = () => {
  let { getUser, deleteUser, user } = useContext(UserContext);
  const users = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [text, setText] = useState("post");
  const [show, setShow] = useState(true);
  const { userId } = useParams();
  const deleted_post = useSelector(
    ({ posts: { deleted_post } }) => deleted_post
  );
  useEffect(() => {
    getUser(Number(userId));

    // eslint-disable-next-line
  }, [deleted_post, user]);

  const deactivateAccount = () => {
    deleteUser(users.id);
    sessionStorage.removeItem("blog");
    sessionStorage.removeItem("user");
    history.push("/login");
  };

  if (show && deleted_post) {
    createNotification(dispatch, "You deleted a post!!!", Number(userId));
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Success message!!!</Alert.Heading>
        <p>Post Deleted</p>
      </Alert>
    );
  }

  return (
    <Container>
      <Flex>
        <Logo style={{ cursor: "pointer" }}>
          {user !== null && user.image_url ? (
            <Image>
              <img src={JSON.parse(user.image_url)} alt='logo' />
            </Image>
          ) : (
            user !== null && user.username.slice(0, 2).toUpperCase()
          )}
        </Logo>
        <Divide>
          {user === null ? (
            <Spinner animation='border' className='loading' />
          ) : (
            <>
              <Username>{user !== null && user.username}</Username>
              <Username>{user !== null && user.email}</Username>
              <Date>
                Joined{" "}
                {moment(user !== null && user.createdAt).format(
                  "MMMM Do YYYY h:mm a"
                )}
              </Date>
              <p>online</p>
            </>
          )}
        </Divide>
      </Flex>
      {userId == users.id && (
        <Label style={{ cursor: "pointer" }} onClick={deactivateAccount}>
          Deactivate Account
        </Label>
      )}
      <ProfileNav>
        <ul>
          <li
            onClick={() => setText("post")}
            className={text === "post" && "active"}
          >
            <Icon name='comment' color='blue' /> Posts{" "}
            {user !== null && user.Posts.length}
          </li>
          <li
            onClick={() => setText("comment")}
            className={text === "comment" && "active"}
          >
            <Icon name='comment' color='blue' /> Comments{" "}
            {user !== null && user.Comments.length}
          </li>
          <li
            onClick={() => setText("setting")}
            className={text === "setting" && "active"}
          >
            <Icon name='cog' color='black' /> Settings
          </li>
        </ul>
      </ProfileNav>
      <ListFlex>
        {user === null ? (
          <Spinner animation='border' className='loading_content' />
        ) : (
          text === "post" &&
          user.Posts.map((post) => (
            <ProfileCard user={user} post={post} allPost={post} key={post.id} />
          ))
        )}
        {user !== null &&
          text === "comment" &&
          user.Comments.map((post) => (
            <ProfileComment user={user} post={post} key={post.id} />
          ))}
      </ListFlex>
    </Container>
  );
};

const Container = styled.div`
  min-height: 93vh;

  .loading,
  .loading_content {
    width: 2.5em;
    height: 2.5em;
    font-size: 0.5em;
    margin-top: 2.5em;
  }

  .loading_content {
    margin-left: 45%;
  }
`;
const Flex = styled.div`
  padding: 2em;
  display: flex;
  background: burlywood;
  color: white;
`;
const Username = styled.div`
  text-transform: capitalize;
`;
const Divide = styled.div`
  padding-left: 1em;

  p {
    color: green;
  }
`;
const Date = styled.div``;
const ProfileNav = styled.div`
  border-bottom: 0.8px solid #ddd;

  @media (max-width: 769px) {
    li {
      font-size: 0.9em;
      padding: 0.5em 0.8em;
    }
  }

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;

    li {
      padding: 0.5em 1em;
      margin: 0;
      cursor: pointer;

      &.active {
        border-bottom: 2px solid orange;
      }
    }
  }
`;
const ListFlex = styled.div`
  padding: 1em;
  margin-top: 2em;
`;

export default Profile;
