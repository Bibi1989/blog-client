import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Icon, Dropdown } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./BlogRedux/store";
import { Logo } from "./home/PostBody";

const activeBorder = {
  color: "#fff",
};

const NavBar = () => {
  const path = useLocation();
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userDetails = [];
  userDetails.push(user);

  const dispatch = useDispatch();
  const posts = useSelector(({ posts: { posts } }) => posts);

  console.log({ blog: posts });

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
                {/* <Link
                  to='/login'
                  className='links'
                  style={active.logouts ? activeBorder : {}}
                >
                  Logout
                </Link> */}
                <span style={{ paddingRight: "0.7em", color: "white" }}>
                  {user.username.toUpperCase()}
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
                      {user.username.toUpperCase().slice(0, 2)}
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
                      content={user.username.toUpperCase()}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Logout</Dropdown.Item>
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
