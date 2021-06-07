const {gql} = require('apollo-server-express');

module.exports = gql`
    type Post {
        id: ID!
        title: String!
        description: String!
    }
    #MAIN QUERY
    type Query {
        totalPosts: Int!
        allPosts: [Post!]!
    }
    #MUTATION
    type Mutation {
        newPost(title:String!,description:String!): Post!
    }
`