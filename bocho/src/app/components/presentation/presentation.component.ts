import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit, OnDestroy {

  timeLeft: number = 15;
  interval:any;
  flag:boolean;

  constructor() { }
  ngOnDestroy(): void {
    this.flag=false;
    this.interval=null;
    this.timeLeft=15;
  }

  ngOnInit(): void {
    this.interval = setInterval(()=>{
      if(this.timeLeft>0){
        this.timeLeft--;
      }else{
        this.flag=true;
        this.timeLeft=15;
      }
    },1000);
  }

}
