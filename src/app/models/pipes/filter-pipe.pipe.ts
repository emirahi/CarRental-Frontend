import { Pipe, PipeTransform } from '@angular/core';
import { CarDto } from '../Dto/cardto';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: CarDto[],filterText:string): CarDto[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((car:CarDto) => car.descriptions.toLocaleLowerCase().indexOf(filterText) !== -1):value
  }
}

