import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Consumer } from '../model/consumer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConsumerService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl: string = environment.urlEndPoint;

  constructor(private http: HttpClient) {}

  getConsumers(): Observable<Consumer[]> {
    return this.http.get<Consumer[]>(this.apiUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getConsumer(id: number): Observable<Consumer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Consumer>(url).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  addConsumer(consumer): Observable<Consumer> {
    return this.http
      .post<Consumer>(this.apiUrl, consumer, this.httpOptions)
      .pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  updateConsumer(id, consumer): Observable<Consumer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Consumer>(url, consumer, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  deleteConsumer(id): Observable<Consumer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Consumer>(url, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }
  private handleError(error: any) {
    console.error('Error consumer service: %s', error);
    throw error;
  }
}
