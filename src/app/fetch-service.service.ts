import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchServiceService {

  constructor(private http: HttpClient) { }

  getAllServices(){
    return this.http.get('/api/services')
  }

  getAllReservations(){
    return this.http.get('/api/reservations')
  }

}
