import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reservationData} from '../interfaces';

interface result{
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
    return this.http.post<result>('/api/makeReservation', book)
  }

  cancelReservation(resId: string, status: string){
    return this.http.post<result>('/api/cancelReservation', {resId, status})
  }

  deleteReservation(resId: string){
    return this.http.post<result>('/api/deleteReservation', {resId})
  }

}
