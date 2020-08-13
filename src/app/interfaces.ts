import { Types } from 'mongoose'

export interface userData {
  success: boolean,
  email: string,
  username: string,
  points: number
}

export interface productData {
  name: string,
	price: number,
	description: string,
	quantity: number,
  tags: [string],
  imageURL: string
}

export interface serviceData {
  title: string,
  duration: number,
  description: string,
  image: string,
  price: number
}

export interface reservationData {
  email: string,
  service: Types.ObjectId,
  date: string,
  beginHour: string,
  finishHour: string
}

export interface cartData {
  productID: string,
  quantity: number
}