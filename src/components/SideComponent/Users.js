import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { getAllPosts } from "../BlogRedux/store";
import { Flex, Logo, Image } from "../home/PostBody";
import { UserContext } from "../userContext/UserProvider";

const Users = () => {
  let { user, getUser, getAllUsers, allUsers } = React.useContext(UserContext);
  let users = JSON.parse(sessionStorage.getItem("user"));
  let image = user !== null && JSON.parse(user.image_url)[0];
  const dispatch = useDispatch();
  const available_tags = [
    { tags: "post", color: "orangered" },
    { tags: "dev", color: "lime" },
    { tags: "article", color: "teal" },
    { tags: "question", color: "red" },
  ];
  const [values] = useState("");
  // new_posts = new_posts.filter((post) =>
  //   post.toLowerCase().includes(values.toLowerCase())
  // );

  useEffect(() => {
    getUser(Number(users.id));
    getAllUsers();
  }, []);

  console.log(allUsers);

  return (
    <Container className='layout'>
      <Menu secondary vertical>
        <Menu.Item
          name='Users'
          onClick={() => getAllPosts(dispatch, "")}
          style={{ background: "#2285D0", color: "#ffffff" }}
          title='All users'
        />
        {allUsers !== null &&
          allUsers.map((post) => (
            <Menu.Item
              onClick={() => getAllPosts(dispatch, post.username.toLowerCase())}
              title={`View ${post.username} posts`}
            >
              <Flex justify='flex-start'>
                <Logo>
                  {post !== null && (
                    <Image>
                      <img src={JSON.parse(post.image_url)[0]} />
                    </Image>
                  )}
                </Logo>
                <Flex flexDirection='column'>
                  <span>{post.username}</span>
                  <p className='user_post'>
                    Post{" "}
                    <span className='num'>
                      {post !== undefined && post.Posts.length}
                    </span>
                  </p>
                </Flex>
              </Flex>
            </Menu.Item>
          ))}
      </Menu>
      <Menu secondary vertical>
        <Menu.Item
          name='Filter By Tags'
          onClick={() => getAllPosts(dispatch, "")}
          style={{ background: "#2285D0", color: "#ffffff" }}
          title='All tags'
        />
        {available_tags.map((tag) => (
          <Menu.Item
            onClick={() => getAllPosts(dispatch, tag.tags)}
            title={`Filter by ${tag.tags}`}
          >
            <Flex justify='flex-start'>
              <Logo style={{ background: `${tag.color}` }}></Logo>
              <span>{tag.tags}</span>
            </Flex>
          </Menu.Item>
        ))}
      </Menu>
    </Container>
  );
};

export default Users;

const Container = styled.div`
  padding-left: 1.3em;

  ul {
    li {
      padding-bottom: 0.7em;
    }
  }
  h2 {
    padding-bottom: 1em;
  }
`;
