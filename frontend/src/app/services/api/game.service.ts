import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from "../../models/api/game.model";

const baseUrl = '/api/items';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  post(data:any): Observable<any> {
    return this.http.post(`${baseUrl}/`,data);
  }

  get(id: any): Observable<Game> {
    return this.http.get(`${baseUrl}/${id}`);
  }
}