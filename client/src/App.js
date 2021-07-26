import React, { useState, useContext } from "react";
// import { MDBBtn } from 'mdb-react-ui-kit';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  from,
  HttpLink,
  ApolloLink, concat
} from "@apollo/client";
/* REACT ROUTER DOM */
import { Switch, Route } from "react-router-dom";
/* Import All Components */
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import PasswordUpdate from "./pages/auth/PasswordUpdate";
import PasswordForgot from "./pages/auth/PasswordForgot";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import Post from "./pages/Post/Post"
import Profile from "./pages/auth/Profile"

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;
  const httpLink = new HttpLink({ uri: process.env.REACT_APP_GQL_ENDPOINT });
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authtoken: user ? user.token : '',
      }
    }));

    return forward(operation);
  })
  const client = new ApolloClient({
    // uri: process.env.REACT_APP_GQL_ENDPOINT,
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/complete-registration" component={CompleteRegistration} />
        <Route exact path="/password/forgot" component={PasswordForgot} />
        <PrivateRoute exact path="/password/update" component={PasswordUpdate} />
        <PrivateRoute exact path="/Profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
