import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Order } from '../model/order';
import { Product } from '../model/product';
import { Consumer } from '../model/consumer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl: string = environment.urlEndPoint;
  private apiProductUrl: string = environment.urlProductEndPoint;
  private apiConsumerUrl: string = environment.urlConsumerEndPoint;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiProductUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getConsumers(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(this.apiConsumerUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Order>(url).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.apiProductUrl}/${id}`;
    return this.http.get<Product>(url).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getConsumer(id: number): Observable<Consumer> {
    const url = `${this.apiConsumerUrl}/${id}`;
    return this.http.get<Consumer>(url).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  addOrder(order: any): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  updateOrder(id: number, order: any): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Order>(url, order, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  deleteOrder(id: number): Observable<Order> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Order>(url, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }
  private handleError(error: any) {
    console.error('Error order service: %s', error);
    throw error;
  }
}
