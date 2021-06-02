import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  private isValidEmail = /\S+@\S+\.\S+/;

  grado: any;

  registerForm = this.formB.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    nacimiento: ['', [Validators.required]],
    grado: ['', [Validators.required]]
  });

  constructor(
    private formB: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public baseError: BaseErrorMessage
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authService.listGrado().subscribe((res) => {
      this.grado = res;
    });

    this.baseError.base=this.registerForm;//le paso la estructura del formulario
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }
    const formValue = this.registerForm.value;
    this.subscription.add(
      this.authService.register(formValue).subscribe((res => {
        if (res) {
          window.alert("Se registro exitosamente");
          this.router.navigate(['']);
        }
      }))
    );
    console.log(this.registerForm.value);
  }

  /* getErrorMessage(field: string): string {
    let message = "";
    if (this.registerForm.get(field)?.errors?.required) {
      message = "Campo obligatorio";
    } else {
      if (this.registerForm.get(field)?.hasError('pattern')) {
        message = "No es un email valido";
      } else {
        if (this.registerForm.get(field)?.hasError('minlength')) {
          const minLength = this.registerForm.get(field)!.errors?.minlength.requiredLength;
          message = `Campo de minimo ${minLength} caracteres`;
        }
      }
    }
    return message;
  } */

  /* isValidField(field: string): boolean {
    return (
      this.registerForm.get(field)!.touched || this.registerForm.get(field)!.dirty && !this.registerForm.get(field)!.valid
    )
  } */


  //refactor de los messages de los campos del formulario, pues en teoria ahora es dinamico
  checkField(field:string):boolean{
    return  this.baseError.isValidField(field);
  }

  fieldMessage(field:string):string{
    return this.baseError.getErrorMessage(field);
  }

  //fin del refactor, los metodos isValidFiled y getErrrorMessage funcionan a nivel local
}
