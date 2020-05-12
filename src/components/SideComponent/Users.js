import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Input } from "semantic-ui-react";
import { useEffect } from "react";
import { useState } from "react";
import { getAllPosts } from "../BlogRedux/store";

const Users = () => {
  const dispatch = useDispatch();
  let posts = useSelector(({ posts: { posts } }) => posts);
  let new_posts = [...new Set([...posts].map((user) => user.username))].sort();
  const [values, setValues] = useState("");
  const handleSearch = ({ target: { value } }) => {
    // posts = posts.filter((post) =>
    //   post.toLowerCase().includes(value.toLowerCase())
    // );
    setValues(value);
  };
  // console.log(new_posts);
  // let a = [];
  // useEffect(() => {
  //   console.log(values);
  // }, [values]);
  new_posts = new_posts.filter((post) =>
    post.toLowerCase().includes(values.toLowerCase())
  );
  // const onsubmit = (e) => {
  //   e.preventDefault();
  //   getAllPosts(dispatch, values);
  // };
  return (
    <Container>
      <h2>Users</h2>
      <form onSubmit={onsubmit}>
        <Input
          onChange={handleSearch}
          type='search'
          placeholder='Search user...'
          style={{ marginBottom: "0.8em", width: "100%" }}
        />
      </form>
      <ul>
        {new_posts.map((post) => (
          <li onClick={() => getAllPosts(dispatch, post)}>{post}</li>
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
