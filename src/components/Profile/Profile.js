import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Logo } from "../home/PostBody";
import { UserContext } from "../userContext/UserProvider";
import ProfileCard from "./ProfileCard";
import { Icon } from "semantic-ui-react";

const Profile = () => {
  let { getUser, user } = useContext(UserContext);
  const [text, setText] = useState("post");
  const { userId } = useParams();
  useEffect(() => {
    getUser(Number(userId));

    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      <Flex>
        <Logo width='60px'>
          {user !== null && user.username.slice(0, 2).toUpperCase()}
        </Logo>
        <Divide>
          <Username>{user !== null && user.username}</Username>
          <Date>{moment(user !== null && user.createdAt).fromNow(false)}</Date>
          <p>online</p>
        </Divide>
      </Flex>
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
        {user !== null &&
          text === "post" &&
          user.Posts.map((post) => (
            <ProfileCard user={user} post={post.title} key={post.id} />
          ))}
        {user !== null &&
          text === "comment" &&
          user.Comments.map((post) => (
            <ProfileCard user={user} post={post.message} key={post.id} />
          ))}
      </ListFlex>
    </Container>
  );
};

const Container = styled.div`
  min-height: 93vh;
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
