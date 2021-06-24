import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs/operators';

@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    if(value==true){
      return 'SI';
    }else if (value==false){
      return 'NO';
    }
    //return null;
  }

}
