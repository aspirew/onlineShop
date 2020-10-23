import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(){
    return this.http.get<Array<order>>('/api/orders')
  }

  getOrder(id){
    return this.http.get<order>(`/api/order/${id}`)
  }

  confirmOrder(id, order: order){
    return this.http.post(`/api/order/${id}/confirm`, order)
  }
}
