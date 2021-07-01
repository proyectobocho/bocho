import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit, OnDestroy {

  publicacion: any = [];
  closeResult = '';
  private subscription: Subscription = new Subscription();
  idPublicacion: number = null;

  publicacionForm = this.formB.group({
    contenido: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(250)]],
    //linkDoc: ['', [Validators.required, Validators.minLength(4)]],
    linkDoc: [''],
    privado: ['', [Validators.required]],
    titulo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
  });

  constructor(
    private publicacionService: PublicacionService,
    private modalService: NgbModal,
    private baseError: BaseErrorMessage,
    private formB: FormBuilder
  ) { }
  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.publicacionService.getMyPublications()
      .subscribe((res) => {
        this.publicacion = res;
      });

    this.baseError.base = this.publicacionForm;
    this.idPublicacion = null;
  }

  open(content: any, p: any) {
    this.publicacionForm.setValue({
      contenido: p.contenido,
      linkDoc: p.linkDoc,
      privado: p.privado.toString(),
      titulo: p.titulo,
    });
    this.idPublicacion = p.id;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editar() {
    if (this.publicacionForm.invalid) {
      return;
    }
    const formValue = this.publicacionForm.value;
    this.subscription.add(
      this.publicacionService.edit(formValue, this.idPublicacion).subscribe((res) => {
        if (res) {
          //window.alert(res.message);
          this.modalService.dismissAll();
          this.ngOnInit();
        }
      })
    );
  }

  eliminar(id: number) {
    if (window.confirm("¿Desea eliminar la publicacion seleccionada? ⚠️")) {
      this.publicacionService.delete(id).subscribe((res) => {
        if (res) {
          //window.alert(res.message);
          this.ngOnInit();
        }
      })
    } else {
      //window.alert("eesa, ojo al tejo perrito malvado 🤡");
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  checkField(field: string): boolean {
    return this.baseError.isValidField(field);
  }

  fieldMessage(field: string): string {
    return this.baseError.getErrorMessage(field);
  }

}
