/* DECLARING SERVERS */
const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const http = require('http');

// CROSS SERVER REQUEST ERROR HANDLER 
const cors = require('cors')

// BODY PARSER
const bodyParser = require("body-parser");

// CLOUDINARY
const cloudinary = require("cloudinary")

/* .env variables */
require('dotenv').config();

// IMPORTING HELPERS
const { authCheck, authCheckMiddleware } = require('./helpers/auth')

/* Express Server */
const app = express()

/* INCLUDING MONGOOSE */
const mongoose = require('mongoose');
// Connecting Db
const db = async () => {
    try {
        //EZala8QZznO1O97X
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Connected')
    } catch (e) {
        console.log('DB Connection Error', e)
    }
}
// Execute DB connection 
db();

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json({ limit: "5mb" }));

/* Path Module */
const path = require('path');

/* Schema Merge Modules */
const { mergeTypeDefs, mergeResolvers } = require('@graphql-toolkit/schema-merging');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { dirname } = require('path');

/* Cloudniary Config */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
/* Routes */
app.get('/rest', authCheck, function (req, res) {
    res.json({
        data: 'You Hit rest end point'
    })
})
// upload
app.post("/uploadimages", authCheckMiddleware, (req, res) => {
    cloudinary.uploader.upload(
        req.body.image,
        (result) => {
            console.log(result);
            res.send({
                // url: result.url,
                url: result.secure_url,
                public_id: result.public_id
            });
        },
        {
            public_id: `${Date.now()}`, // public name
            resource_type: 'auto' // JPEG, PNG
        }
    );
})
app.post("/removeimage", authCheckMiddleware, (req, res) => {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (error, result) => {
        if (error) return res.json({ success: false, error });
        res.send('ok');
    });
})

/* Port */
app.listen(process.env.PORT, function () {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
})

/* GRAPHQL MERGING ALL SCHEMAS INTO ONE */
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')))

/* merging resolvers*/
// Function to execute query
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

/* GRAPHQL SERVER INIT*/
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
});

/* MIDDLEWARES */
//ApplyMiddleware method connects ApolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({
    app
})

/* Core Http Server */
const httpserver = http.createServer(app);