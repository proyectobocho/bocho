import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  loginForm = this.formB.group({
    email: [''],
    password: ['']
  });

  constructor(public authService: AuthService, private formB: FormBuilder, private router: Router) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }

  onLogin() {
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe((res) => {
        if (res) {
          window.alert("Se ha logueado exitosamente");
          this.router.navigate(['/home']);
        }
      })
    );

  }

}
