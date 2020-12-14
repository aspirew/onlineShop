import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface imageUploadStatus {
  success: boolean,
  name: string,
  message: string
}


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  uploadImage(data: FormData){
    return this.http.post<imageUploadStatus>('/api/product/addImage', data)
  }

  deleteImage(name: string){
    return this.http.get<imageUploadStatus>(`/api/images/delete/${name}`)
  }

}
