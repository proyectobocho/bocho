import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators'
import { User, UserData, UserResponse } from '../../models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* private loggedIn = new BehaviorSubject<boolean>(false);
  private userToken = new BehaviorSubject<string>(null); */

  private user = new BehaviorSubject<UserResponse>(null);//parte del refactor

  constructor(private http: HttpClient, private router:Router) {
    this.checkToken();
  }

  /* get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  get userTokenValue(): string {
    return this.userToken.getValue();
  } */

  //parte del refactor
  get user$():Observable<UserResponse>{
    return this.user.asObservable();
  }
  get userValue():UserResponse{
    return this.user.getValue();
  }
  //fin del refactor

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);

          /* this.loggedIn.next(true);
          this.userToken.next(user.token); */

          this.user.next(user);//parte del refactor
          return user;
        }),
        catchError((err) => this.handlerError(err))
      )
  }

  logout(): void {
    localStorage.removeItem('user');

    /* this.loggedIn.next(false);
    this.userToken.next(null); */

    this.user.next(null);//parte del refactor
    this.router.navigate([''])
  }

  register(registerData: UserData): Observable<any | void> {
    return this.http.post<any>(`${environment.API_URL}/auth/register`, registerData)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  listGrado(): Observable<any | void> {
    return this.http.get(`${environment.API_URL}/grado-estudio/list`)
      .pipe(
        catchError((err) => this.handlerError(err))
      );
  }

  private saveLocalStorage(user: UserResponse): void {
    //localStorage.setItem('token', token);
    const { userId, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')!) || null;
    if (user) {
      const isExpired = helper.isTokenExpired(user.token);
      if (isExpired) {
        this.logout();
      } else {
        /* this.loggedIn.next(true);
        this.userToken.next(user.token); */
        
        this.user.next(user);//parte del refactor
      }
    }
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
