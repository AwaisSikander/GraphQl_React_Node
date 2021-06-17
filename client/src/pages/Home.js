import React,{useState,useContext} from "react";
import { ApolloClient, InMemoryCache, gql,useQuery,useLazyQuery } from "@apollo/client";
import {AuthContext} from '../context/authContext'
import {useLocation,useHistory} from 'react-router-dom'

const GET_ALL_POSTS = gql`
    {
        allPosts{
            id,
            title,
            description
        }
    }
`;

const Home = () => {
    const [fetchPosts,{data}] = useLazyQuery(GET_ALL_POSTS)
    let history = useHistory();
    // Access Context
    const {state,dispatch} = useContext(AuthContext);
    const updateUserName = ()=>{
        dispatch({
            type: "LOGGED_IN_USER",
            payload: "Awais Sikander"
        })
    }

    return (
        <div className="mx-5 card my-3 p-3">
            <p>{JSON.stringify(state)}</p> 
            <p>{JSON.stringify(history)}</p> 
            <p>{JSON.stringify(data)}</p> 
            <hr/>
            <button onClick={()=>fetchPosts()} className="btn-btn-raised btn-primary">Fetch</button>
            <hr/>
            <button onClick={updateUserName} className="btn-btn-raised btn-success">Dispatch User Method</button>
        </div>
    );
};

export default Home;
