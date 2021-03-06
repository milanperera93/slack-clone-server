import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }

    type Query {
        getUserById(id: Int!): User!
        getAllUsers: [User!]! 
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!):  User!
    }
`;
