import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productData } from '../interfaces';
import { ImageService } from './image.service';

interface status {
  success: boolean,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private image: ImageService) { }

  editProduct(id, editData){
    return this.http.post<status>(`/api/product/${id}/edit`, editData)
  }

  async uploadProduct(productData, data: FormData){
    const imageUploadRes = await this.image.uploadImage(data).toPromise();
    if(imageUploadRes.success){
      const name = imageUploadRes.name
      return await this.http.post<status>('/api/product/add', {productData, name}).toPromise()
    }
    else return {success: imageUploadRes.success, message: imageUploadRes.message}
  }
}
