const {gql} = require('apollo-server-express');
const {posts} = require('../temp')

/* All Resolvers */
/* Quries */
const totalPosts = ()=>posts.length
const allPosts = ()=>posts

/* Mutations */
const newPost = (parent,args)=>{
    console.log("Parent",parent)
    console.log("args",args)
    /* Create new post object */
    const post = {
        id:posts.length + 1,
        title:args.title,
        description:args.description,
    }
    /* Push New Post Object to posts array */
    posts.push(post)
    return post;
}

/* EXPORT QUERY */
module.exports = {
    Query: {
        totalPosts,
        allPosts
    },
    Mutation:{
        newPost
    }
}
