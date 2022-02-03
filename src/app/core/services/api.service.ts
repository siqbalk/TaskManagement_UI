import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _base_url = environment.apiEndpoint;
  constructor(private _http: HttpClient) {
  }

  get(endpoint: string, ): Observable<any> {
    return this._http
      .get(`${this._base_url}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  post(endpoint: string, data: any, ignoreLoader = false): Observable<any> {
    return this._http
      .post(`${this._base_url}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  put(endpoint: string, data: any): Observable<any> {
    return this._http
      .put(`${this._base_url}/${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  delete(endpoint: string): Observable<any> {
    return this._http
      .delete(`${this._base_url}/${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }
}
