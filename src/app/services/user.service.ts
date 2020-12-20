import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { userData } from '../interfaces'

interface status {
  status: boolean
}

interface unregisteredStatus {
  order_id: string,
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

  getDataByEmail(email) {
    return this.http.post<userData>('/api/data', {email})
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

  checkUnregisteredUserHasInitializedOrder(){
    return this.http.get<unregisteredStatus>('/api/data/unregisteredOrderInitialized')
  }
}
