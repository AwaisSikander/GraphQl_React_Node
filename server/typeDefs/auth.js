const {gql} = require('apollo-server-express');

module.exports = gql` 
    type Query {
        me: String!
    }
    #CUSTOM TYPE
    type UserCreateResponse{
        username:String!
        email:String!
    }
    type Mutation {
        userCreate:UserCreateResponse!
    }
`