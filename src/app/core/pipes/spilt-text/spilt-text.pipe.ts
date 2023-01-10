import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spiltText'
})
export class SpiltTextPipe implements PipeTransform {

  transform(value: string, numberOfChar:number): unknown {
    return value.substring(0,numberOfChar)+ '...';
  }

}
