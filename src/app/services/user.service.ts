import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { userData } from '../interfaces'

interface status {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<userData>('/api/data')
  }

  setDeliveryData(delivery) {
    return this.http.post<status>('/api/setDeliveryData', delivery)
  }

  isLoggedIn() {
    return this.http.get<status>('/api/isLoggedIn')
  }

  updateUserCart(cart){
    return this.http.post<status>('/api/updateCart', cart)
  }

  changeUserPassword(currentPassword, newPassword){
    return this.http.post<status>('/api/changePass', {cPass: currentPassword, newPass: newPassword})
  }
}
