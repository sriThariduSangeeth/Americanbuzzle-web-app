import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient) { }
  SERVER_URL: string = environment.apiUrl;

  public upload(formData: FormData) {
    console.log("upload service function is called")
    console.log(formData)
    return this.httpClient.post<FormData>(`${this.SERVER_URL}/news/post`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public getCategory(): Observable<{ data: Category[] }> {
    console.log("get categpry method call");
    return this.httpClient.get<{ data: Category[] }>(`${this.SERVER_URL}/news/category`);
  }
}
