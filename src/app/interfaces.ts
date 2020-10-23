import { Types } from 'mongoose'

export interface userData {
  success: boolean,
  email: string,
  username: string,
  points: number,
  deliveryDetails: deliveryData,
  cart: Array<cartData>
}

export interface deliveryData {
  name: string,
	surname: string,
	street: string,
	houseNum: number,
	flatNum: number,
	city: string,
	zip: string
}

export interface productData {
  _id: Types.ObjectId
  name: string,
	price: number,
	description: string,
	quantity: number,
  tags: [string],
  image_url: string
}

export interface serviceData {
  _id: Types.ObjectId,
  title: string,
  duration: number,
  description: string,
  image: string,
  price: number
}

export interface reservationData {
  _id: string,
  email: string,
  service: Types.ObjectId,
  status: string,
  date: string,
  beginHour: string,
  finishHour: string
}

export interface cartData {
  productID: Types.ObjectId,
  quantity: number
}

export interface cartInterface {
  product: productData,
  quantity: number
}

export interface constants {
  STANDARD_HOURS: Array<string>,
  CLOSED_AT: Array<number>,
  OPENED_UNTIL: number
}

export interface order {
  email: String,
  products: Array<cartData>,
  value: Number,
  deliveryDetails: deliveryData,
  status: String,
  date: Date
}


