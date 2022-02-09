import { Collection, ObjectId } from "mongodb"

export interface Product {
  _id: ObjectId
  title: string
  image: string
  price: number
}

export interface Database {
  products: Collection<Product>
}
