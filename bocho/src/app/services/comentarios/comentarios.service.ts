import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  getAll(id: number): Observable<any[] | void> {
    return this.http
      .get<any[]>(`${environment.API_URL}/comentario/list/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      )
  }

  new(comentario: any, id: number): Observable<any | void> {
    return this.http
      .post<any>(`${environment.API_URL}/comentario/new/${id}`, comentario)
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
