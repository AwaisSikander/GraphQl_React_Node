/* DECLARING SERVERS */
const express = require('express');
const {ApolloServer} = require ('apollo-server-express')
const http = require('http');

/* .env variables */
require('dotenv').config();

// IMPORTING HELPERS
const {authCheck}  = require('./helpers/auth')

/* INCLUDING MONGOOSE */
const mongoose = require('mongoose');
// Connecting Db
const db = async ()=>{
    try{
        //EZala8QZznO1O97X
        const success = await mongoose.connect(process.env.DATABASE,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected')
    }catch(e){
        console.log('DB Connection Error',e)
    }
}
// Execute DB connection 
db();

/* Path Module */
const path = require('path');

/* Schema Merge Modules */
const {mergeTypeDefs, mergeResolvers} = require('@graphql-toolkit/schema-merging');
const {loadFilesSync} = require('@graphql-tools/load-files');
const { dirname } = require('path');

/* Express Server */
const app = express()

/* Routes */
app.get('/rest',authCheck,function (req,res) { 
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
    resolvers,
    context:({req,res})=>({req,res})
});

/* MIDDLEWARES */
//ApplyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({
    app
})

/* Core Http Server */
const httpserver = http.createServer(app);