import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraMayuscula',
  standalone: true,
})
export class PrimeraMayusculaPipe implements PipeTransform {
  transform(value: string, ...args: string[]): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
