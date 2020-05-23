import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../BlogRedux/store";
import PostCard from "./PostBody";
import PostForm from "./PostForm";

import { Spinner } from "react-bootstrap";
import { useState } from "react";
import MobileSubNav from "../NavBar/MobileSubNav";
import { Icon } from "semantic-ui-react";

const Post = () => {
  const dispatch = useDispatch();
  const [text] = useState("");
  const [render, setRender] = useState(false);
  const posts = useSelector(({ posts: { posts } }) => posts) || [];
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
    setRender(!render);

    // eslint-disable-next-line
  }, [added_post, added_comment, deleted_post]);

  if (posts === null && loading) {
    return (
      <>
        <Loader padding='5em'>
          <Spinner animation='border' variant='success' />
        </Loader>
      </>
    );
  }

  return (
    <Container>
      <div className='mobile'>
        <MobileSubNav />
      </div>
      <PostForm />
      {loading && (
        <Loader padding='5em'>
          <Spinner animation='border' variant='success' />
        </Loader>
      )}
      <Grid>
        {posts.length === 0 ? (
          <Loader padding='5em'>
            <Icon name='edit outline' /> <p>No posts...</p>
          </Loader>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </Grid>
    </Container>
  );
};
{
  /* <PostCard key={post._id} post={post} /> */
}

export default Post;

export const Container = styled.div`
  min-height: 93vh;
  .loading {
    width: 100px;
    height: 100px;
    text-align: center;
    margin-top: 10%;
  }

  .mobile {
    display: none;
  }

  @media (max-width: 769px) {
    .mobile {
      display: inline-block;
    }
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
  padding-top: ${(props) => (props.padding ? props.padding : "")};
  padding-bottom: ${(props) => (props.padding ? props.padding : "")};
`;
