import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogout } from "../../models/api/user-logout.model";


const baseUrl = '/api/logout';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {

  constructor(private http: HttpClient) { }

  post(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/`,data);
  }
}