import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const PostLists = () => {
  const posts = useSelector(({ posts: { posts } }) => posts);
  console.log(posts);
  return (
    <Container>
      <h3>Users</h3>
      <div>
        {posts.map((post) => (
          <p>{post.username}</p>
        ))}
      </div>
    </Container>
  );
};

export default PostLists;

const Container = styled.div``;
