import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import styled from "styled-components";

import Login from "./components/users/Login";
import Register from "./components/users/Register";
import NotFound from "./components/users/NotFound";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { BlogProvider } from "./components/blogContext/BlogProvider";
import { UserProvider } from "./components/userContext/UserProvider";
import Comments from "./components/home/Comments";
import store from "./redux/store";
import Post from "./components/home/Post";

import "bootstrap/dist/css/bootstrap.min.css";
import FirstLayout from "./components/SideComponent/FirstLayout";
import Users from "./components/SideComponent/Users";

function App() {
  const token = sessionStorage.getItem("blog");
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Router>
      <Provider store={store}>
        <UserProvider>
          <NavBar />
          <Layout>
            <div className='sticky'>{token ? <Users /> : <div></div>}</div>
            <Switch>
              <PrivateRoute exact path='/' component={Post} />
              <Route exact path='/home' component={Post} />
              <PrivateRoute
                exact
                path='/comments/:commentId'
                component={Comments}
              />
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route to='/abc'>
                <NotFound />
              </Route>
            </Switch>
            <div></div>
          </Layout>
        </UserProvider>
      </Provider>
    </Router>
  );
}

export default App;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  padding-left: 25%;
  padding-right: 7%;
  background: #f9fbfc;

  .sticky {
    position: fixed;
    width: 20%;
    left: 1em;
    top: 9vh;
  }

  @media (max-width: 769px) {
    grid-template-columns: 0% 100% 0%;
    padding-left: 0em;

    .sticky {
      position: static;
    }
    .layout {
      display: none;
    }
  }
`;
