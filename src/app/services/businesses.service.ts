import { Injectable } from '@angular/core';
import { Business } from '../models/business';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessesService {

  constructor( private http: HttpClient) { }

  getBusinesshData(): Observable<Business[]> {
    return this.http.get<Business[]>("./assets/data/businesses.json")
    .pipe(
      map((respnse: Business[]) => {
        // return this.setParentChildRelationship(respnse);
        return respnse;
      }),
      catchError((error: HttpErrorResponse): Observable<any> => {
          return throwError(() => error);
      })
    );
  }
}
