import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private apiReportUrl: string = environment.apiReportUrl;

  constructor(private http: HttpClient) {}

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiReportUrl).pipe(tap(res => console.log(res), error => this.handleError(error)));
  }

  private handleError(error: any) {
    console.error('Error services: %s', error);
    throw error;
  }
}
