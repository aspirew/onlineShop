import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { order } from '../interfaces';

interface searchResult {
  success: boolean,
  result: Array<order>
}

interface status {
  success: boolean,
  message: string
}


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

  getSomeOrders(page, perPage){
    return this.http.post<Array<order>>(`/api/orders/${page}`, {perPage})
  }

  searchOrders(searchPhrase){
    return this.http.post<searchResult>('/api/order/search', {searchPhrase})
  }

  changeStatus(id, status){
    return this.http.post<status>('/api/order/statusChange', {id, status})
  }

  confirmOrder(id, order: order){
    return this.http.post(`/api/order/${id}/confirm`, order)
  }
}
