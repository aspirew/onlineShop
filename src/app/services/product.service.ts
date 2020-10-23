import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface status {
  success: boolean,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  editProduct(id, editData){
    console.log(editData)
    console.log(id)
    return this.http.post<status>(`/api/product/${id}/edit`, editData)
  }
}
