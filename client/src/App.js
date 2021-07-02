import React, { useState } from "react";
// import { MDBBtn } from 'mdb-react-ui-kit';
import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloProvider,
  from,
} from "@apollo/client";
/* REACT ROUTER DOM */
import { Switch, Route } from "react-router-dom";
/* Import All Components */
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import Login from "./pages/auth/Login";
import { ToastContainer } from "react-toastify";


const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/complete-registration" component={CompleteRegistration} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;