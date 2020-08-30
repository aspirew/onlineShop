import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  loginAdmin(password){
    return this.http.post<boolean>('/api/admin/login', {password})
  }
}
