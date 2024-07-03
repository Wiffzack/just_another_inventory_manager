import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrl: './dynamic-list.component.css'
})
export class DynamicListComponent {

  @Input() inputFromParent: any;

  ngAfterViewInit(): void {
    console.log(this.inputFromParent)
    this.dummyObjectArray = this.inputFromParent;
  }
  //public modalDisplayStyle: string;
  //public dummyObjectExpandedIndex: number;


  /* the following object can be replaced by any JSON response
  * of your backend server
  * but for the sake of simplicity
  * I used this dummy array of objects
  */
  public dummyObjectArray: any = [
    {
      age: 56,
      name: 'blue',
        }
  ]



  toogleModal(listIndex: number, expanded?: boolean): void {
    // reset
    this.dummyObjectArray.forEach((a:any, index:any) => {
      Object.assign(this.dummyObjectArray[index], { expanded: false });
    });

    // open modal for the the single clicked dummyObject
    // unless modal already open
    if (expanded) {
      return
    }
    Object.assign(this.dummyObjectArray[listIndex], { expanded: true });

  }

}
