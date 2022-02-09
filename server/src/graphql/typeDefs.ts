import { gql } from "apollo-server-core"

// tag template literal
export const typeDefs = gql`
  type Product {
    id: ID!
    title: String!
    image: String!
    price: Int!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    deleteProduct(id: ID!): Product!
  }
`
