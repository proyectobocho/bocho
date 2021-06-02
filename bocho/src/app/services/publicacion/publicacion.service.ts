import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Publicacion } from 'src/app/models/publicacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.API_URL}/publicacion/list`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  new(publicacion: Publicacion): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/publicacion/new`, publicacion)
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
