import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../BlogRedux/store";
import PostCard from "./PostCard";
import PostForm from "./PostForm";

import { Spinner } from "react-bootstrap";
import { useState } from "react";
import MobileSubNav from "../NavBar/MobileSubNav";
import { Icon, Button } from "semantic-ui-react";

const Post = () => {
  const dispatch = useDispatch();

  // filter state
  const [text] = useState("");

  // rendering state
  const [render, setRender] = useState(false);
  const [reload, setReload] = useState(false);

  // paginating state
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // redux states
  const posts = useSelector(({ posts: { posts } }) => posts) || [];
  const added_post = useSelector(({ posts: { added_post } }) => added_post);
  const deleted_post = useSelector(
    ({ posts: { deleted_post } }) => deleted_post
  );
  const added_comment = useSelector(
    ({ posts: { added_comment } }) => added_comment
  );
  const loading = useSelector(({ posts: { loading } }) => loading);
  const pagination = useSelector(({ posts: { pagination } }) => pagination);

  useEffect(() => {
    getAllPosts(dispatch, text, page, limit);
    setRender(!render);

    // if (page > posts.length - 2) {
    //   setPage(1);
    // }

    // eslint-disable-next-line
  }, [added_post, added_comment, deleted_post, reload, page]);

  console.log({ pagination });

  const paginatePost = () => {
    setPage(page + 1);
    if (page > posts.length - 2) {
      setPage(1);
    }
  };

  if (posts === null && loading) {
    return (
      <>
        <Loader padding='5em'>
          <Spinner animation='border' variant='success' />
        </Loader>
      </>
    );
  }

  console.log({ page });

  return (
    <Container>
      <div className='mobile'>
        <MobileSubNav />
      </div>
      <PostForm reload={reload} setReload={setReload} />
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
        <PaginateDiv>
          <Button onClick={() => setPage(page + 1)}>Load More</Button>
        </PaginateDiv>
      </Grid>
    </Container>
  );
};

export default Post;

const PaginateDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em 0;
`;

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
