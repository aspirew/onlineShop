import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from './user.service';

import { userData } from './interfaces'

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

private loggedInStatus = false
private currentUser = null

  constructor(private http: HttpClient, private user: UserService) { }

  setLoggedIn(value: boolean){
    this.loggedInStatus = value
  }

  setUserData(value: userData){
    this.currentUser = value
  }

  get isLoggedIn(){
    return this.loggedInStatus
  }

  get userData(){
    return this.currentUser
  }

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
