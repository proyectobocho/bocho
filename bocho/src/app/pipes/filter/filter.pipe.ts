import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg.length<1 || arg===''){
      return value;
    }
    const result=[];
    for(const g of value){
      if(g.nombre.toLowerCase().indexOf(arg.toLowerCase())>-1){
        result.push(g)
      }
    }
    return result;
  }

}
