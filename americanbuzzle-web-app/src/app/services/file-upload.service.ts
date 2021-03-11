import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient:HttpClient) { }
  SERVER_URL: string = "http://localhost:9098/user/driver";  

  public upload(formData: FormData) {
    console.log("upload service function is called")
    console.log(formData)
    return this.httpClient.post<FormData>(`${environment.apiUrl}/user/driver`, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
}
