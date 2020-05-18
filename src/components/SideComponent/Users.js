import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu } from "semantic-ui-react";
import { useState } from "react";
import { getAllPosts } from "../BlogRedux/store";
import { Flex, Logo } from "../home/PostBody";

const Users = () => {
  const dispatch = useDispatch();
  let posts = useSelector(({ posts: { posts } }) => posts);
  let new_posts = [
    ...new Set([...posts].map((user) => user.User.username)),
  ].sort();
  let tags = [...new Set([...posts].map((user) => user.tags))];
  const available_tags = [
    { tags: "post", color: "orangered" },
    { tags: "dev", color: "lime" },
    { tags: "article", color: "teal" },
    { tags: "question", color: "red" },
  ];
  const [values] = useState("");
  new_posts = new_posts.filter((post) =>
    post.toLowerCase().includes(values.toLowerCase())
  );
  console.log(tags);
  return (
    <Container className='layout'>
      <Menu secondary vertical>
        <Menu.Item
          name='Users'
          onClick={() => getAllPosts(dispatch, "")}
          style={{ background: "#2285D0", color: "#ffffff" }}
        />
        {new_posts.map((post) => (
          <Menu.Item onClick={() => getAllPosts(dispatch, post)}>
            <Flex justify='flex-start'>
              <Logo>{post !== null && post.slice(0, 2).toUpperCase()}</Logo>
              <span>{post}</span>
            </Flex>
          </Menu.Item>
        ))}
      </Menu>
      <Menu secondary vertical>
        <Menu.Item
          name='Filter By Tags'
          onClick={() => getAllPosts(dispatch, "")}
          style={{ background: "#2285D0", color: "#ffffff" }}
        />
        {available_tags.map((tag) => (
          <Menu.Item onClick={() => getAllPosts(dispatch, tag.tags)}>
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
