import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  user: any;
  creado:boolean=false;
  @Output() flagEvent = new EventEmitter<boolean>();

  //falta refrescar el homecomponent
  @Output() creadoEvent=new EventEmitter<boolean>();

  publicacionForm = this.formB.group({
    contenido: ['', [Validators.required, Validators.minLength(5)]],
    linkDoc: ['', [Validators.required, Validators.minLength(4)]],
    privado: ['', [Validators.required]]
  });
  //{ contenido, linkDoc, privado }
  constructor(
    private authService: AuthService,
    private publicacionService: PublicacionService,
    private baseError: BaseErrorMessage,
    private formB: FormBuilder
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue.user;
    this.baseError.base = this.publicacionForm;
  }

  onSubmit() {
    if (this.publicacionForm.invalid) {
      return;
    }
    const formValue = this.publicacionForm.value;
    console.log(formValue);
    this.subscription.add(
      this.publicacionService
        .new(formValue)
        .subscribe((res => {
          if (res) {
            console.log("res: ", res);
            window.alert("Se realizo la publicacion");
            this.ngOnInit;
            this.creado=true;
          }
        }))
    );
  }

  sendCancel() {
    this.flagEvent.emit(false);
  }

  sendSubmit(){
    if(this.creado==true){
      this.creadoEvent.emit(true);
    }
  }

  checkField(field: string): boolean {
    return this.baseError.isValidField(field);
  }

  fieldMessage(field: string): string {
    return this.baseError.getErrorMessage(field);
  }

}
