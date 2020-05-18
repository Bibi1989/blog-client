import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Icon, Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./BlogRedux/store";
import { Logo } from "./home/PostBody";
import { UserContext } from "./userContext/UserProvider";

const activeBorder = {
  color: "#fff",
};

const NavBar = () => {
  let { getUser } = useContext(UserContext);
  const history = useHistory();
  const token = sessionStorage.getItem("blog");
  const users = JSON.parse(sessionStorage.getItem("user"));
  const userDetails = [];
  userDetails.push(users);

  const dispatch = useDispatch();
  const posts = useSelector(({ posts: { posts } }) => posts);

  useEffect(() => {
    getAllPosts(dispatch, "");
  }, []);

  const [active, setActive] = useState({
    home: true,
    login: false,
    register: false,
    logouts: false,
  });
  const handleClick = (link) => {
    if (link === "home") {
      setActive({
        home: true,
        login: false,
        register: false,
        logouts: false,
      });
    } else if (link === "login") {
      setActive({
        home: false,
        login: true,
        register: false,
        logouts: false,
      });
    } else if (link === "register") {
      setActive({
        home: false,
        login: false,
        register: true,
        logouts: false,
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("blog");
    sessionStorage.removeItem("user");
  };

  return (
    <Nav>
      <ul>
        <li onClick={() => handleClick("home")}>
          {token ? (
            <Link
              to='/'
              onClick={() => getAllPosts(dispatch, "")}
              className='links'
              style={active.home ? activeBorder : {}}
            >
              Bibi-Blog
            </Link>
          ) : (
            <Link
              to='/home'
              className='links'
              style={active.home ? activeBorder : {}}
            >
              Bibi-Blog
            </Link>
          )}
        </li>

        <div>
          {!token && (
            <ul>
              <li onClick={() => handleClick("login")}>
                <Link
                  to='/login'
                  className='links'
                  style={active.login ? activeBorder : {}}
                >
                  Login
                </Link>
              </li>
              <li onClick={() => handleClick("register")}>
                <Link
                  to='/register'
                  className='links'
                  style={active.register ? activeBorder : {}}
                >
                  Register
                </Link>
              </li>
            </ul>
          )}

          {token && (
            <ul>
              <li style={{ display: "flex", alignItems: "center" }}>
                <span style={{ paddingRight: "0.7em", color: "white" }}>
                  {users.username.toUpperCase()}
                </span>

                <Dropdown
                  text={
                    <Logo
                      width='30px'
                      style={{
                        background: "white",
                        color: "#777",
                        fontSize: "0.8em",
                        margin: "0",
                        cursor: "pointer",
                      }}
                    >
                      {users.username.toUpperCase().slice(0, 2)}
                    </Logo>
                  }
                  icon=''
                  floating
                  labeled
                  className='icon'
                >
                  <Dropdown.Menu
                    style={{ minWidth: "250px", marginLeft: "-220px" }}
                  >
                    <Dropdown.Header
                      icon='tags'
                      content={users.username.toUpperCase()}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => history.push(`/profile/${users.id}`)}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handleLogout();
                        history.push("/login");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          )}
        </div>
      </ul>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.div`
  padding: 1em 10%;
  background: #2285d0;

  .icon {
    margin: 0;
    i {
      display: none;
    }
  }

  .menu {
    margin-left: -100px;
  }

  @media (max-width: 769px) {
    padding: 0.7em;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;

    div {
      display: flex;
      li {
        padding: 0 1rem;
        .links {
          text-decoration: none;
          color: #ffffff;
          font-size: 1.3rem;
          padding: 0.7rem 10px;
          transition: all 0.5s ease;
        }
      }
    }
    li:first-child {
      .links {
        text-decoration: none;
        color: #ffffff;
        font-size: 1.3rem;
        padding: 0.7rem 10px;
        transition: all 0.5s ease;
      }
    }
  }
`;
