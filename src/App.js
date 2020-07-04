import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import styled from "styled-components";
// import { Container, Button, Link } from "react-floating-action-button";

import Login from "./components/users/Login";
import Register from "./components/users/Register";
import NotFound from "./components/users/NotFound";
import NavBar from "./components/NavBar/NavBar";
import PrivateRoute from "./components/privateRoute/privateRoute";
import { UserProvider } from "./components/userContext/UserProvider";
import Comments from "./components/home/Comments";
import store from "./redux/store";
import Post from "./components/home/Post";

import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./components/SideComponent/Users";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/users/ForgotPassword";
import SendEmailComponent from "./components/users/SendEmail";
import ErrorPage from "./ErrorPage";

function App() {
  const token = sessionStorage.getItem("blog");

  return (
    <Router>
      <Provider store={store}>
        <UserProvider>
          <NavBar />
          <Layout>
            <div className='sticky'>{token ? <Users /> : <div></div>}</div>
            <Switch>
              <PrivateRoute exact path='/' component={Post} />
              {/* <Route exact path='/home' component={Post} /> */}
              <PrivateRoute
                exact
                path='/comments/:commentId'
                component={Comments}
              />
              <PrivateRoute exact path='/profile/:userId' component={Profile} />
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
              <Route exact path='/forgotpassword/:id'>
                <ForgotPassword />
              </Route>
              <Route exact path='/resetpassword'>
                <SendEmailComponent />
              </Route>
              <Route exact path='/error'>
                <ErrorPage />
              </Route>
              <Route to='/abc'>
                <NotFound />
              </Route>
            </Switch>
            {/* <div>
              <Container>
                <Link href='#' tooltip='Edit Post' icon='far fa-edit' />
                <Link href='#' tooltip='Add Post' icon='fas fa-plus' />
                <Button
                  tooltip='The big plus button!'
                  icon='fas fa-plus'
                  rotate={true}
                  onClick={() => alert("FAB Rocks!")}
                />
              </Container>
            </div> */}
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
  padding-right: 1%;

  .sticky {
    position: fixed;
    width: 20%;
    left: 1em;
    top: 9vh;
  }

  @media (max-width: 769px) {
    grid-template-columns: 0% 100%;
    padding-left: 0;
    padding-right: 0;

    .sticky {
      position: static;
    }
    .layout {
      display: none;
    }
  }
`;
