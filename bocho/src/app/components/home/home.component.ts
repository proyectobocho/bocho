import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PublicacionService } from 'src/app/services/publicacion/publicacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //user: any;
  flag:boolean=false;
  publicacion:any=[];

  constructor(private publicacionService:PublicacionService) { }

  ngOnInit(): void {
    this.publicacionService.getAll().subscribe((res)=>{
      //console.log("res: ",res);
      let p:any=res;
      this.publicacion=p.publicacion;
    })
  }

  refresh(flag:boolean){
    this.ngOnInit();
  }
}
