import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservationData} from '../interfaces';

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

  getAllUserReservations(){
    return this.http.get<Array<reservationData>>('/api/visits')
  }

  makeReservation(book: reservationData){
    return this.http.post<reservationResult>('/api/makeReservation', book)
  }

}
