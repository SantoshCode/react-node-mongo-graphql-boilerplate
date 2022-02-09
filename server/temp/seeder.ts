// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config()

import { ObjectId } from "mongodb"
import { client, connectDatabase } from "../src/database"
import { Product } from "../src/lib/types"

const seed = async () => {
  try {
    console.log("[seed] : running...")

    const db = await connectDatabase(client)

    const products: Product[] = [
      {
        _id: new ObjectId(),
        title: "Product 1",
        image: "https://example.com/1.png",
        price: 100
      },
      {
        _id: new ObjectId(),
        title: "Product 2",
        image: "https://example.com/2.png",
        price: 23
      },
      {
        _id: new ObjectId(),
        title: "Product 3",
        image: "https://example.com/3.png",
        price: 45
      }
    ]

    for (const product of products) {
      await db.products.insertOne(product)
    }

    console.log("[seed] : success")
  } catch {
    throw new Error("Faild to seed database")
  }
}

seed()
