import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { productData, reservationData, serviceData, constants } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(){
    return this.http.get<Array<serviceData>>('/api/services')
  }

  getServiceById(id){
    return this.http.get<serviceData>(`api/services/${id}`)
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

  getProductById(ID){
    return this.http.post<productData>('/api/productID', {ID})
  }

  getNumOfProducts(){
    return this.http.get<number>('/api/productsQuantity')
  }

  getConstants(){
    return this.http.get<constants>('/api/constants')
  }

  searchProducts(searchPhrase: string){
    return this.http.post<Array<productData>>('/api/productsSearch', {searchPhrase})
  }

}
