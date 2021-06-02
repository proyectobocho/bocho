import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { UserResponse } from "../models/user.interface";
import { AuthService } from "../services/auth/auth.service";

@Injectable(
    { providedIn: 'root' }
)

export class CheckLoginGuard implements CanActivate {

    constructor(private authService: AuthService,private router:Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map((user: UserResponse) => {
                if(user){
                    return true;
                }else{
                    this.router.navigate(['/']);
                    return false;
                }
            })
        );
    }
    //(user ? true : false) //esto estaba en el map como respuesta a la funcion (user:UserResponse) =>

}