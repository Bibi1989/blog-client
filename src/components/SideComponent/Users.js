import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Menu, Input } from "semantic-ui-react";
import { getAllPosts } from "../BlogRedux/store";
import { Flex, Logo, Image } from "../home/PostBody";
import { UserContext } from "../userContext/UserProvider";
import { Loader } from "../home/Post";
import { Spinner } from "react-bootstrap";

const Users = () => {
  let { getUser, getAllUsers, allUsers } = React.useContext(UserContext);
  let users = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const loading = useSelector(({ posts: { loading } }) => loading);
  const available_tags = [
    { tags: "post", color: "orangered" },
    { tags: "dev", color: "lime" },
    { tags: "article", color: "teal" },
    { tags: "question", color: "red" },
  ];

  const [search, setSearch] = useState("");

  useEffect(() => {
    getUser(Number(users.id));
    getAllUsers(search);

    // eslint-disable-next-line
  }, [search]);

  const handleSearch = ({ target: { value } }) => {
    setSearch(value.toLowerCase());
  };

  return (
    <Container className='layout'>
      <Menu secondary vertical>
        <Menu.Item
          name='Users'
          onClick={() => {
            getAllPosts(dispatch, "");
            setSearch("");
          }}
          style={{ background: "#2285D0", color: "#ffffff" }}
          title='All users'
        />
        <Loader padding='1em'>
          {loading && <Spinner animation='border' variant='info' />}
        </Loader>
        <Input
          type='search'
          placeholder='Search for a user'
          loading
          value={search}
          onChange={handleSearch}
        />
        {allUsers !== null &&
          [...allUsers]
            .slice(0, 10)
            .map(({ email, username, image_url, Posts }) => {
              return (
                <Menu.Item
                  key={email}
                  onClick={() => getAllPosts(dispatch, username.toLowerCase())}
                  title={`View ${username} posts`}
                >
                  <Flex justify='flex-start'>
                    <Logo>
                      {
                        <Image>
                          <img src={JSON.parse(image_url)} alt='logo' />
                        </Image>
                      }
                    </Logo>
                    <Flex flexDirection='column'>
                      <span>{username}</span>
                      <p className='user_post'>
                        Post <span className='num'>{Posts.length}</span>
                      </p>
                    </Flex>
                  </Flex>
                </Menu.Item>
              );
            })}
      </Menu>
      <Menu secondary vertical>
        <Menu.Item
          name='Filter By Tags'
          onClick={() => {
            getAllPosts(dispatch, "");
            setSearch("");
          }}
          style={{ background: "#2285D0", color: "#ffffff" }}
          title='All tags'
        />
        {available_tags.map((tag) => (
          <Menu.Item
            key={tag.tags}
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
