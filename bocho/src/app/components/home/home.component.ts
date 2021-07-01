import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComentariosService } from 'src/app/services/comentarios/comentarios.service';
import { LikeService } from 'src/app/services/like/like.service';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy {

  //user: any;
  flag: boolean = false;
  publicacion: any = [];
  coments: any = [];
  comentar: boolean = false;
  idPublicacion: number = 0;
  contenido: any;
  likes: any = [];
  ok: any = [];

  comentarioForm = this.formB.group({
    descripcion: ['', [Validators.required, Validators.minLength(2)]]
  })


  constructor(
    private publicacionService: PublicacionService,
    private comentariosService: ComentariosService,
    private modalService: NgbModal,
    private baseError: BaseErrorMessage,
    private formB: FormBuilder,
    private likeService: LikeService
  ) { }
  ngOnDestroy(): void {
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.publicacionService.getAll().subscribe((res) => {
      let p: any = res;
      this.publicacion = p.publicacion;
    });

    this.baseError.base = this.comentarioForm;
  }

  open(content: any, id: any) {
    if (id) {
      this.idPublicacion = id;
      this.contenido = content;
      this.comentariosService.getAll(this.idPublicacion).subscribe((res) => {
        this.coments = res;
      });
      this.likeService.list(this.idPublicacion).subscribe((res) => {
        this.likes = res;
        let id = parseInt(localStorage.getItem("userId"));
        this.ok = this.likes.find((x: any) => x.user.id == id);
      });

    }
    this.modalService.open(content, { backdropClass: 'prueba' });
  }

  onSubmit() {
    if (this.comentarioForm.invalid) {
      return;
    }
    const formValue = this.comentarioForm.value;
    //console.log(formValue);
    this.comentariosService
      .new(formValue, this.idPublicacion)
      .subscribe((res) => {
        if (res) {
          //window.alert(res.message);
          this.comentar = false;
          this.modalService.dismissAll();
          this.ngOnInit();
          this.open(this.contenido, this.idPublicacion);
        }
      })
  }

  megusta() {
    this.likeService.change(this.idPublicacion).subscribe(
      (res) => {
        console.log(res)
        this.modalService.dismissAll();
        this.ngOnInit();
        this.open(this.contenido, this.idPublicacion);
      }
    );
  }

  creado($event: any) {
    this.flag = $event;
    this.ngOnInit();
  }

  checkField(field: string): boolean {
    return this.baseError.isValidField(field);
  }

  fieldMessage(field: string): string {
    return this.baseError.getErrorMessage(field);
  }
}
