import React,{useState} from "react";
import { ApolloClient, InMemoryCache, gql,useQuery,useLazyQuery } from "@apollo/client";

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
    return (
        <div className="mx-5 card my-3 p-3">
            <p>{JSON.stringify(data)}</p> 
            <hr/>
            <button onClick={()=>fetchPosts()} className="btn-btn-raised btn-primary">Fetch</button>
        </div>
    );
};

export default Home;
