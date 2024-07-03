import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(test: any, searchText: string): any {
    console.log(searchText)
    console.log(test)
    if(!test) return [];
    if(!searchText) return test;

    searchText = searchText.toLowerCase();

  // filters the items based on the 'name' and 'company' properties
  // Thus searching for records who's name or company match the 'searchText' string
    return test.filter((test:any) => 
        (test.name.toLowerCase().includes(searchText))
    );
  }

}