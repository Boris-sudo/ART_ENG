import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from "../../models/api/profile.model";


const baseUrl = '/api/profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileApiService {

  constructor(private http: HttpClient) { }

  post(data:any): Observable<any> {
    return this.http.post(`${baseUrl}`,data);
  }

  get(): Observable<Profile> {
    return this.http.get(`${baseUrl}`);
  }
}