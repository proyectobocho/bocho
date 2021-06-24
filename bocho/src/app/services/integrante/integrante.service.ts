import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntegranteService {

  constructor(private http: HttpClient) { }

  new(id: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/integrante/new/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${environment.API_URL}/integrante/delete/${id}`)
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
