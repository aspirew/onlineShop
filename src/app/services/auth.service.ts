import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';

import { userData } from '../interfaces'

interface myData {
  success: boolean,
  message: string
}

interface registerResponse {
  success : boolean,
  message : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  logUserIn(email, password){
    return this.http.post<myData>('/api/login', {
      email,
      password
    })
  }

  logUserOut(){
    return this.http.get('/api/logout')
  }

  registerUser(username, email, password){
    return this.http.post<registerResponse>('/api/register', {
      username,
      email,
      password
    })
  }

}
