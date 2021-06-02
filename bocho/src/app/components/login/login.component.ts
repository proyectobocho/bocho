import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  loginForm = this.formB.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
  });

  constructor(public authService: AuthService, private formB: FormBuilder, private router: Router, public baseError:BaseErrorMessage) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.baseError.base=this.loginForm;
  }

  onLogin() {
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe((res) => {
        if (res) {
          //console.log(res);
          window.alert(`Bienvenido ${res.user.nombre} ${res.user.apellido} 😎`);
          this.router.navigate(['/home']);
        }
      })
    );
  }

  checkField(field:string):boolean{
    return  this.baseError.isValidField(field);
  }

  fieldMessage(field:string):string{
    return this.baseError.getErrorMessage(field);
  }

}
