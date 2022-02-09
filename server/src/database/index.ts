import { MongoClient } from "mongodb"
import { Database } from "../lib/types"

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/tinyhousedb?retryWrites=true&w=majority`

export const client = new MongoClient(url)

export const connectDatabase = async (
  client: MongoClient
): Promise<Database> => {
  try {
    await client.connect()
    console.log("🌱 MongoDB connected")
  } catch (error) {
    console.log(error)
    throw Error("Error occurred while connecting to MongoDB")
  }

  const db = client.db("boilerplate-db")

  return {
    products: db.collection("products")
  }
}

export const disconnectDatabase = async (client: MongoClient) => {
  try {
    await client.close()
    console.log("🔴 Database Connection Closed!")
  } catch (error) {
    console.log(error)
    throw Error("❌ Something went wrong while closing Database connection")
  }
}
