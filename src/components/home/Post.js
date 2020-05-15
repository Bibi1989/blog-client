import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllPosts } from "../BlogRedux/store";
import PostCard from "./PostBody";
import PostForm from "./PostForm";

import { Spinner } from "react-bootstrap";
import { useState } from "react";

const Post = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [text, setText] = useState("");
  const token = sessionStorage.getItem("blog");
  const posts = useSelector(({ posts: { posts } }) => posts);
  const added_post = useSelector(({ posts: { added_post } }) => added_post);
  const likes = useSelector(({ posts: { likes } }) => likes);
  const deleted_post = useSelector(
    ({ posts: { deleted_post } }) => deleted_post
  );
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  const loading = useSelector(({ posts: { loading } }) => loading);

  useEffect(() => {
    getAllPosts(dispatch, text);
  }, [added_post, likes, added_comment, deleted_post]);

  // if (!token) {
  //   history.push("/home");
  // }

  return (
    <Container>
      <PostForm />
      <Loader>
        {loading && <Spinner animation='border' className='loading' />}
      </Loader>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </Grid>
    </Container>
  );
};

export default Post;

export const Container = styled.div`
  .loading {
    width: 100px;
    height: 100px;

    text-align: center;
    margin-top: 10%;
  }
`;
export const Grid = styled.div`
  height: 80vh;
  padding-bottom: 3em;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background: teal;
  }
`;
export const Loader = styled.div`
  display: flex;
  justify-content: center;
`;
