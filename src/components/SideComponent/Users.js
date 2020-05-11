import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const Users = () => {
  let posts = useSelector(({ posts: { posts } }) => posts);
  posts = [...new Set([...posts].map((user) => user.username))].sort();
  console.log(posts);
  const handleSearch = ({ target: { value } }) => {
    posts = posts.filter((post) =>
      post.toLowerCase().includes(value.toLowerCase())
    );
  };
  console.log(posts);
  return (
    <Container>
      <h2>Users</h2>
      <Input
        onChange={handleSearch}
        type='search'
        placeholder='Search user...'
        style={{ marginBottom: "0.8em", width: "100%" }}
      />
      <ul>
        {posts.map((post) => (
          <li>{post}</li>
        ))}
      </ul>
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
