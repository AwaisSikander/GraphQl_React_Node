import React,{useState} from "react";
// import { MDBBtn } from 'mdb-react-ui-kit';
import { ApolloClient, InMemoryCache, gql ,ApolloProvider } from "@apollo/client";

/* Import All Components */
import Home from './pages/Home'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default App;
