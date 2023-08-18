import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentModel } from "../../models/api/payment.class";

const baseUrl = '/api/payments/';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  post(data:any): Observable<any> {
    return this.http.post(`${baseUrl}`,data);
  }
}