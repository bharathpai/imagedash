import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'https://imagedash-upload-api.herokuapp.com';

  constructor(private http: HttpClient) { }

  onFileSelected(formData: FormData) {
    return this.http.post(`${this.baseUrl}/api/upload`, formData, {
      responseType: 'text'
    })

  }
}