import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private http: HttpClient) { }

  list(id: any): Observable<any[] | void> {
    return this.http
      .get<any[]>(`${environment.API_URL}/like/list/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      )
  }

  change(id: any): Observable<any | void> {
    return this.http
      .get(`${environment.API_URL}/like/change/${id}`)
      .pipe(
        catchError((err) => this.handlerError(err))
      )
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
