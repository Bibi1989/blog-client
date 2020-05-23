import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getAllPosts } from "../BlogRedux/store";
import { UserContext } from "../userContext/UserProvider";
import { Dropdown, Menu } from "semantic-ui-react";

const MobileSubNav = () => {
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

  const [state, setState] = useState({ activeItem: "all" });

  const handleItemClick = (e, { name }) => {
    console.log(name);
    setState({ activeItem: name });
    getAllPosts(dispatch, name);
  };

  const { activeItem } = state;

  React.useEffect(() => {
    getAllUsers("");

    // eslint-disable-next-line
  }, []);
  return (
    <Nav>
      {/* <Tag onClick={() => getAllPosts(dispatch, "post")}>Post</Tag>
      <Tag onClick={() => getAllPosts(dispatch, "dev")}>Dev</Tag>
      <Tag onClick={() => getAllPosts(dispatch, "article")}>Article</Tag>
      <Tag onClick={() => getAllPosts(dispatch, "question")}>Question</Tag>
      <Tag onClick={() => getAllPosts(dispatch, "")}>All</Tag> */}

      <Menu secondary>
        {/* <Drop
          icon=''
          text='Users'
          style={{ padding: "0.6em 0.3em", background: "orange" }}
          floating
          labeled
          className='icon'
        >
          <Dropdown.Menu>
            {allUsers !== null &&
              allUsers.map((all) => (
                <Dropdown.Item
                  key={all.username}
                  onClick={() =>
                    getAllPosts(dispatch, all.username.toLowerCase())
                  }
                >
                  {all.username}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Drop> */}
        <Menu.Item
          name='all'
          active={activeItem === "all"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='post'
          active={activeItem === "post"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='dev'
          active={activeItem === "dev"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='article'
          active={activeItem === "article"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='question'
          active={activeItem === "question"}
          onClick={handleItemClick}
        />
      </Menu>
    </Nav>
  );
};

export default MobileSubNav;

const Nav = styled.nav`
  width: 100vw;
  display: flex;
  padding: 0em 1em;
  background: #1e90aa;
  color: white;

  .menu {
    .active {
      border-bottom: 4px solid white !important;
    }

    .item {
      color: #fff;
    }
  }
`;
const User = styled.div`
  .icon {
    &:first-child {
      border-right: 1px solid #ccc;
    }
  }
`;
const Tag = styled.div`
  padding-left: 0.7em;
  padding-right: 0.7em;
  border-right: 1px solid #ccc;
`;
const Drop = styled(Dropdown)`
  margin: 0;
  padding: 0;

  .icon {
    display: none;
  }
`;
