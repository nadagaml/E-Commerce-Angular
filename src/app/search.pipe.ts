import { Product } from './interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[]  ,searchTerm:string):  Product[] {
    return products.filter((product)=>product.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
