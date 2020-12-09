import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productData } from '../interfaces';

interface status {
  success: boolean,
  message: string
}

interface imageUploadStatus {
  success: boolean,
  name: string,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  editProduct(id, editData){
    return this.http.post<status>(`/api/product/${id}/edit`, editData)
  }

  async uploadProduct(productData, data: FormData){
    const imageUploadRes = await this.http.post<imageUploadStatus>('/api/product/addImage', data).toPromise()
    if(imageUploadRes.success){
      const name = imageUploadRes.name
      return await this.http.post<status>('/api/product/add', {productData, name}).toPromise()
    }
    else return {success: imageUploadRes.success, message: imageUploadRes.message}
  }
}
