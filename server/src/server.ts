// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

import http from "http"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled
} from "apollo-server-core"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

import { client, connectDatabase, disconnectDatabase } from "./database"
import { typeDefs, resolvers } from "./graphql"

async function startApolloServer() {
  const app = express()

  try {
    const db = await connectDatabase(client)
    const httpServer = http.createServer(app)

    const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginLandingPageDisabled()
      ],
      context: () => ({
        db
      })
    })

    await apolloServer.start()
    apolloServer.applyMiddleware({ app, path: "/api" })

    httpServer.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
      )
    })
  } catch (error) {
    await disconnectDatabase(client)
    console.error(error)
    throw Error("Something went wrong while starting apollo server")
  }
}

startApolloServer()
