import React, { useState, useContext } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery, useLazyQuery } from "@apollo/client";
import { AuthContext } from '../context/authContext'
import { useLocation, useHistory } from 'react-router-dom'

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
    const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS)
    const { data, loading, error } = useQuery(GET_ALL_POSTS);
    let history = useHistory();
    // Access Context
    const { state, dispatch } = useContext(AuthContext);
    const updateUserName = () => {
        dispatch({
            type: "LOGGED_IN_USER",
            payload: "Awais Sikander"
        })
    }
    if (loading) return <p className="p-5">Loading...</p>;

    return (
        <div className="container">
            <div className="row p-5">
                {data.allPosts.map(p => (
                    <div className="col-md-4" key={p.id}>
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">
                                    <h4>{p.title}</h4>
                                </div>
                                <p className="card-text">{p.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row p-5">
                <button onClick={() => fetchPosts()} className="btn-btn-raised btn-primary">
                    Fetch posts
                </button>
            </div>
            <hr />
            {JSON.stringify(posts)}
            <hr />
            {JSON.stringify(state.user)}
            <hr />
            <button className="btn btn-primary" onClick={updateUserName}>
                Change user name
            </button>
            <hr />
            {JSON.stringify(history)}
        </div>
    );
};

export default Home;
