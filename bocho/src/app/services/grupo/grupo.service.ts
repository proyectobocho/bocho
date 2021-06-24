import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/grupo/list`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  getMyList(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.API_URL}/grupo/myList`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  getOne(id: any): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/grupo/find/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  new(grupo: any): Observable<any> {
    return this.http.post(`${environment.API_URL}/grupo/new`, grupo)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  edit(grupo: any, id: any): Observable<any> {
    return this.http.patch(`${environment.API_URL}/grupo/edit/${id}`, grupo)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.API_URL}/grupo/delete/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  private handlerError(err: any): Observable<never> {
    let errorMessage = 'ocurrio un error en el envio de los datos';
    if (err) {
      errorMessage = `Error: ${err.error?.message} .Code: ${err.status}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
