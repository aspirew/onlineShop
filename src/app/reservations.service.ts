import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservationData } from './interfaces';

interface reservationResult{
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(private http: HttpClient) { }

  getAllReservations(){
    return this.http.get<Array<reservationData>>('/api/reservations')
  }

  makeReservation(book: reservationData){
    console.log(book)
    return this.http.post<reservationResult>('/api/makeReservation', book)
  }

}
