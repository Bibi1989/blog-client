import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Input, Menu, Dropdown } from "semantic-ui-react";
import { useState } from "react";
import { getAllPosts } from "../BlogRedux/store";
import { Flex, Logo, H1 } from "../home/PostBody";

const Users = () => {
  const dispatch = useDispatch();
  let posts = useSelector(({ posts: { posts } }) => posts);
  let new_posts = [...new Set([...posts].map((user) => user.username))].sort();
  const [values, setValues] = useState("");
  const handleSearch = ({ target: { value } }) => {
    setValues(value);
  };
  new_posts = new_posts.filter((post) =>
    post.toLowerCase().includes(values.toLowerCase())
  );
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
              <Logo>{post.slice(0, 2).toUpperCase()}</Logo>
              {/* <H1>{post !== null && `Posted By @${post}`}</H1> */}
              <span>{post}</span>
            </Flex>
          </Menu.Item>
        ))}
      </Menu>
    </Container>
  );
};

{
  /*  */
}

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
