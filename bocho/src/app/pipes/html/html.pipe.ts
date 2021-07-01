import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //console.log(value);
    /* let open=/</g;
    let close=/>/g;
    let aux;
    aux=value.replace(open,'&lt;');
    aux=aux.replace(close,'&gt;')
    console.log(aux) */
    let aux='"'+value+'"'
    return aux;
  }

}
