import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface status {
  status: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  loginAdmin(password){
    return this.http.post<status>('/api/admin/login', {password})
  }

  isLoggedIn(){
    return this.http.get<status>('/api/admin/isLoggedIn')
  }
}
