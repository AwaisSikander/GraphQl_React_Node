/* DECLARING SERVERS */
const express = require('express');
const {ApolloServer} = require ('apollo-server-express')
const http = require('http');

/* .env variables */
require('dotenv').config(); 

/* Path Module */
const path = require('path');

/* Schema Merge Modules */
const {mergeTypeDefs, mergeResolvers} = require('@graphql-toolkit/schema-merging');
const {loadFilesSync} = require('@graphql-tools/load-files');
const { dirname } = require('path');

/* Express Server */
const app = express()

/* Routes */
app.get('/rest',function (req,res) { 
    res.json({
        data:'You Hit rest end point'
    })
})

/* Port */
app.listen(process.env.PORT,function(){
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
})

/* GRAPHQL MERGING ALL SCHEMAS INTO ONE */
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname,'./typeDefs')))

/* merging resolvers*/
// Function to execute query
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname,'./resolvers')));

/* GRAPHQL SERVER INIT*/
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

/* MIDDLEWARES */
//ApplyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({
    app
})

/* Core Http Server */
const httpserver = http.createServer(app);