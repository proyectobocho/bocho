import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserResponse } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLogged = false;
  private destroy$ = new Subject<any>();

  constructor(private authService: AuthService) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((user: UserResponse) => {
      if(user){
        this.isLogged=true;
      }
    });

    console.log("Logeado? -> ", this.isLogged);
  }

  onLogout(): void {
    this.authService.logout();
    this.isLogged = false;
    window.alert("Hasta la proxima 😥");
  }

}
