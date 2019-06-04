import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiUrl: string = 'http://localhost:3000/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  getProduct(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  addProduct(product): Observable<Product> {
    return this.http
      .post<Product>(this.apiUrl, product, this.httpOptions)
      .pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  updateProduct(id, product): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Product>(url, product, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  deleteProduct(id): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Product>(url, this.httpOptions).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }
  private handleError(error: any) {
    console.error('Error product service: %s', error);
    throw error;
  }
}
