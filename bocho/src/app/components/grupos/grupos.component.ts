import { flatten } from '@angular/compiler';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComentariosService } from 'src/app/services/comentarios/comentarios.service';
import { GrupoService } from 'src/app/services/grupo/grupo.service';
import { IntegranteService } from 'src/app/services/integrante/integrante.service';
import { BaseErrorMessage } from 'src/app/utils/base-field-error';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: any = [];
  misGrupos: any = [];
  grupo: any = [];
  selected: boolean = false;
  search: boolean = false;

  idPublicacion: any;
  idGrupo: any = 0;
  contenido: any;
  coments: any;
  comentar: boolean = false;
  flag: boolean = false;
  miRol: any = "";
  falgEditar: boolean = false;

  comentarioForm = this.formB.group({
    descripcion: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]]
  });

  grupoForm = this.formB.group({
    descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    foto: ['', [Validators.required, Validators.minLength(3)]]
  })

  filter: string = '';
  group: any = [];

  constructor(
    private grupoService: GrupoService,
    private modalService: NgbModal,
    private comentariosService: ComentariosService,
    private baseError: BaseErrorMessage,
    private formB: FormBuilder,
    private integranteService: IntegranteService
  ) { }

  ngOnInit(): void {
    this.grupoService.getAll().subscribe(
      (res) => {
        this.grupos = res;
      }
    );

    this.grupoService.getMyList().subscribe(
      (res) => {
        this.misGrupos = res;
      }
    );
  }

  ver() {
    try {
      let aux = JSON.parse(this.group);
      this.group = aux;
      this.search = true;
      this.selected = false;
    } catch (error) {
      this.group = [];
      this.search = false;
    }
  }

  unirse() {
    //console.log(this.group.id);
    this.integranteService.new(this.group.id).subscribe(
      (res) => {
        window.alert(res.message);
        this.ngOnInit();
      }
    );
  }

  desunirse(id: any) {
    if (window.confirm("¿Desea desunirse del grupo?")) {
      this.integranteService.delete(id).subscribe(
        (res) => {
          window.alert(res.message);
          this.ngOnInit();
          this.selected = false;
        }
      );
    }
  }


  seleccionado(id: any) {
    this.grupoService.getOne(id).subscribe(
      (res) => {
        this.grupo = res.grupo[0];
        this.selected = true;
        this.idGrupo = id;
        this.miRol = res.rol;
      }
    )
  }

  open(content: any, id: any) {
    if (id) {
      this.baseError.base = this.comentarioForm;
      this.idPublicacion = id;
      this.contenido = content;
      this.comentariosService.getAll(this.idPublicacion).subscribe((res) => {
        this.coments = res;
      })
    }
    this.modalService.open(content, { backdropClass: 'prueba' });
  }

  newGroup(content: any) {
    this.baseError.base = this.grupoForm;
    this.modalService.open(content, { backdropClass: 'prueba' });
    this.falgEditar = false;
    //this.grupoForm.reset();
  }

  editGroup(content: any) {
    this.grupoForm.setValue({
      descripcion: this.grupo.descripcion,
      nombre: this.grupo.nombre,
      foto: this.grupo.foto,
    });
    this.baseError.base = this.grupoForm;
    this.modalService.open(content, { backdropClass: 'prueba' });
    this.falgEditar = true;
  }

  onOk() {
    if (this.grupoForm.invalid) {
      return;
    }

    if (this.falgEditar == true) {
      const formValue = this.grupoForm.value;
      this.grupoService.edit(formValue, this.grupo.id).subscribe(
        (res) => {
          window.alert(res.message);
          this.ngOnInit();
          this.grupoForm.reset();
          this.modalService.dismissAll();
        }
      );
    } else {
      const formValue = this.grupoForm.value;
      this.grupoService.new(formValue).subscribe(
        (res) => {
          window.alert(res.message);
          this.ngOnInit();
          this.grupoForm.reset();
          this.modalService.dismissAll();
        }
      )
    }
  }

  eliminarGrupo(id:any){
    if (window.confirm("¿Desea borra el grupo?")) {
      this.grupoService.delete(id).subscribe(
        (res) => {
          window.alert(res.message);
          this.ngOnInit();
        }
      );
    }
  }

  onSubmit() {
    if (this.comentarioForm.invalid) {
      return;
    }
    const formValue = this.comentarioForm.value;
    //console.log(formValue)
    this.comentariosService
      .new(formValue, this.idPublicacion)
      .subscribe((res) => {
        if (res) {
          window.alert(res.message);
          this.comentar = false;
          this.modalService.dismissAll();
          this.ngOnInit();
          this.open(this.contenido, this.idPublicacion);
          this.seleccionado(this.idGrupo);
        }
      })

  }

  creado($event: any) {
    this.flag = $event;
    this.ngOnInit();
    this.seleccionado(this.idGrupo);
  }

  checkField(field: string): boolean {
    return this.baseError.isValidField(field);
  }

  fieldMessage(field: string): string {
    return this.baseError.getErrorMessage(field);
  }

}
