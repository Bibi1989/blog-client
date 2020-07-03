import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPosts,
  getNotifications,
  deleteNotification,
} from "../BlogRedux/store";
import { Profile } from "./NavProfile";
import { Notify } from "./NavNotify";


const activeBorder = {
  color: "#fff",
};

const NavBar = () => {
  const history = useHistory();
  const token = sessionStorage.getItem("blog");
  const users = JSON.parse(sessionStorage.getItem("user"));
  let image = token ? users.image_url : null;
  const userDetails = [];
  userDetails.push(users);

  const dispatch = useDispatch();
  let notices = useSelector(({ posts: { notices } }) => notices);
  let added_notice = useSelector(({ posts: { added_notice } }) => added_notice);
  let deleted_notices = useSelector(
    ({ posts: { deleted_notices } }) => deleted_notices
  );

  // notices = [...notices].filter((notice) => notice.userId === users.id);

  useEffect(() => {
    getAllPosts(dispatch, "");
    getNotifications(dispatch);

    // eslint-disable-next-line
  }, [added_notice, deleted_notices]);

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
              <span className='bibi'>Bibi</span> <i>Blog</i>
            </Link>
          ) : (
            <div className='links' style={{ margin: "0", padding: "0" }}>
              <span className='bibi'>Bibi</span> <i>Blog</i>
            </div>
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
                <Notify
                  notices={notices}
                  deleteNotification={deleteNotification}
                  dispatch={dispatch}
                />
                <span style={{ paddingRight: "0.7em", color: "white" }}>
                  {users.username.toUpperCase()}
                </span>
                <Profile
                  image={image}
                  users={users}
                  history={history}
                  handleLogout={handleLogout}
                />
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
      /* display: none; */
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

        .bibi {
          color: orange;
        }

        i {
          color: tomato;
        }
      }
    }
  }
`;
