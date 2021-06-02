import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService:AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        //const authToken = this.authService.userTokenValue;

        const userValue = this.authService.userValue; //parte del refactor

        //construccion basica para agregar datos en los headres, en este caso es para enviar el token para poder acceder a recursos protegidos en la API
        if (req.url.includes('publicacion')) {
            const authReq = req.clone({
                setHeaders: {
                    //auth: authToken,
                    auth: userValue.token,//parte del refactor
                }
            });
            return next.handle(authReq);
        }

        return next.handle(req);
    }

}