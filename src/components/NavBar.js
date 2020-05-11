import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Select } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "./BlogRedux/store";

const activeBorder = {
  color: "teal",
  borderBottom: "5px solid teal",
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
    getAllPosts(dispatch);
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

  const urlCheck = () => {
    if (path.pathname === "/" || path.pathname === "") {
      setActive({
        home: true,
        login: false,
        register: false,
        logouts: false,
      });
    } else if (path.pathname === "/login") {
      setActive({
        home: false,
        login: true,
        register: false,
        logouts: false,
      });
    } else if (path.pathname === "/register") {
      setActive({
        home: false,
        login: false,
        register: true,
        logouts: false,
      });
    }
  };
  console.log(userDetails);

  const handleLogout = () => {
    sessionStorage.removeItem("blog");
    sessionStorage.removeItem("user");
  };

  return (
    <div>
      <Nav>
        <ul>
          <li onClick={() => handleClick("home")}>
            {token ? (
              <Link
                to='/'
                className='links'
                style={active.home ? activeBorder : {}}
              >
                {user.username[0].toUpperCase() + user.username.slice(1)}
              </Link>
            ) : (
              <Link
                to='/login'
                className='links'
                style={active.home ? activeBorder : {}}
              >
                Home
              </Link>
            )}
          </li>

          <div>
            {!token && (
              <>
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
              </>
            )}

            {token && (
              <li onClick={handleLogout}>
                <Link
                  to='/login'
                  className='links'
                  style={active.logouts ? activeBorder : {}}
                >
                  Logout
                </Link>
              </li>
            )}
          </div>
        </ul>
      </Nav>
    </div>
  );
};

export default NavBar;

const Nav = styled.div`
  padding: 1% 10%;
  background: #f4f4f4;
  margin-bottom: 3%;

  @media (max-width: 769px) {
    padding: 1em;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      li {
        padding: 0 1rem;
        .links {
          text-decoration: none;
          color: #555;
          font-size: 1.3rem;
          padding: 0.7rem 10px;
          transition: all 0.5s ease;
        }
      }
    }
    li:first-child {
      .links {
        text-decoration: none;
        color: #555;
        font-size: 1.3rem;
        padding: 0.7rem 10px;
        transition: all 0.5s ease;
      }
    }
  }
`;
