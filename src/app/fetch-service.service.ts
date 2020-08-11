import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { productData, reservationData, serviceData } from './interfaces'

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(){
    return this.http.get<Array<serviceData>>('/api/services')
  }

  getAllReservations(){
    return this.http.get<Array<reservationData>>('/api/reservations')
  }

  getAllProducts(){
    return this.http.get<Array<productData>>('/api/products')
  }

  getSomeProducts(page, perPage){
    return this.http.post<Array<productData>>(`api/products/${page}`, {perPage})
  }

  getProductByName(name){
    return this.http.post<productData>('/api/product', {name})
  }

  getNumOfProducts(){
    return this.http.get<number>('/api/products/quantity')
  }

}