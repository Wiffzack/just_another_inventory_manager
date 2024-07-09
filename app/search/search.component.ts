import { Component, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Input } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { Overlay } from '@angular/cdk/overlay';
const { read, write, utils } = XLSX;

import { TemplateRef } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

export interface PeriodicElement {
  articel_id: number,
  articel_name: string,
  number: number,
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    articel_id: 2222,
    articel_name: "Test Articel",
    number: 67
  }
];

interface Cars {
  name: string,
  age: number
}

export interface Item {
  id: number;
  name: string;
}

type AOA = any[][];

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent {

  file_header = ["articel_id", "articel_name", "number"];
  current_data: any = [];

  data: any = [[1, 2], [3, 4]];
  data_json: any = {};
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  current_column_text: string = "";


  example = {
    articel_id: 56,
    articel_name: "test",
    number: 56,
  }

  displayedColumns: string[] = ['articel_id', 'articel_name', 'number'];
  dataSource:any = new MatTableDataSource(ELEMENT_DATA);

  animal: string;
  name: string;
  childCompData = "child";
  menuElem:any;


  //displayedColumns: string[] = ['name'];

  users = Array.from({ length: 10 }, () => ({
    name: "test"
  }));
  sub: Subscription;

  @ViewChild('userMenu') userMenu: TemplateRef<any>;

  overlayRef: OverlayRef | null;



  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;


  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: any, item: Item) {
    console.log(event)
    console.log(item)
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    let element = document.getElementById('right_menu');
    this.contextMenu.menuData = { 'item': item };
    try {
      if (this.contextMenu['menu']) {
        this.contextMenu['menu'].focusFirstItem('mouse');
      }
    } catch (e) {
      console.log(e);
    }
    this.contextMenu.openMenu();
    let container: any = document.getElementsByClassName("cdk-overlay-container")[0];
    console.log("container")
    console.log(container)
    // cdk-overlay-container
    if (element) {
      element.style.top = event.layerY+"px";
      element.style.left = event.layerX+"px";
      container.style.top =  event.layerY+"px";
      container.style.left = event.layerX+"px";

    }
  }

  onContextMenuAction1(item: Item) {
    alert(`Click on Action 1 for ${item.name}`);
  }

  onContextMenuAction2(item: Item) {
    alert(`Click on Action 2 for ${item.name}`);
  }


  openDialog(): void {
    console.log("open dialog")
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

      let i = 0;
      for (const [key, value] of Object.entries(this.data)) {
        //console.log(`${key}: ${value}`);
        if (i == 0) {
          this.file_header = this.data[key as any];
          //this.displayedColumns = this.file_header;
        } else {
          this.current_data.push(this.data[key as any]);
          let cache = {
            articel_id: this.data[key as any][1],
            articel_name: this.data[key as any][0],
            number: this.data[key as any][2]
          }
          console.log(value)
          this.data_json[this.data[key as any][1]] = cache;
          console.log(this.data_json);
          //this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
          //console.log(this.data[key as any]);
        }
        i++;
        console.log(this.current_data);
      }
      console.log(this.data);
      this.exportList()
    };
    reader.readAsBinaryString(target.files[0]);
  }


  export(): void {
    console.log("download excel")
    console.log(this.data)
    var result = Object.keys(this.data).map((key) => [key, this.data[key]['articel_name'], this.data[key]['number']]);
    console.log(result)
    //test:[] = [[1, 2], [3, 4]];
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(result);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  rows = new Array<any>();


  name1: string = 'Reading JSON file';
  searchText: string;
  //data:any = [];
  finish_loading = false;

  posts: any;
  xhr: any;
  item_list: any;
  constructor(private _router: Router,public dialog: MatDialog, public overlay: Overlay, public viewContainerRef: ViewContainerRef) {
    this.searchText = "";
  }

  ngOnInit() {

  }

  onrightClick(event:any){
    console.log(event);
  }

  createQRCode() {
    this._router.navigate(['qrgen'], { queryParams: { url: this.current_column_text } })
  }

  ngAfterViewInit(): void {
    this.sendRequest();
    //this.exportList();
    //this.updateValue();
    console.log("request done");

    var bodyElem = document.body;
    var rect = bodyElem.getBoundingClientRect();
    this.menuElem = document.querySelector('.menu');
    console.log(this.menuElem)
    var menuX = this.menuElem.clientWidth;
    var menuY = this.menuElem.clientHeight;
    console.log(bodyElem.getBoundingClientRect());

    let table_raw: any = document.getElementsByClassName("table_value")[0];
    console.log(table_raw)
    table_raw.addEventListener('contextmenu', (event:any) => {
      console.log(event)
      console.log(event.target.innerHTML)
      console.log(event.target.dataset.attrId)
      console.log("context menu called"); 
      event.preventDefault();
      this.menuElem.style.left = event.layerX+"px";
      this.menuElem.style.top = event.layerY+"px";
      var { clientX, clientY } = event;
      this.menuElem.style.transform = 'scale(1)';
      this.current_column_text = event.target.dataset.attrId;
    });
    document.addEventListener('click', (event) => {
      this.menuElem.style.transform = 'scale(0)';
    });

  }

  yourFunction(input: any) {
    this.rows = input; // Update your model
    this.displayedColumns = this.rows.length > 0 ? Object.keys(this.rows[0]) : [];
    console.log(this.displayedColumns);
    this.dataSource = new MatTableDataSource(this.rows);
  }

  checkRequest() {

    if (this.xhr.readyState == 0) {
      //window.alert("Uninitialized");
    }
    if (this.xhr.readyState == 1) {
      //window.alert("loading");
    }
    if (this.xhr.readyState == 2) {
      //window.alert("loaded");
    }
    if (this.xhr.readyState == 3) {
      //window.alert("waiting");
    }
    if (this.xhr.readyState == 4) {
      //window.alert("completed");
      try {
        var y = JSON.parse(this.xhr.responseText);
        console.log(y)
        this.data = y;
        this.finish_loading = true;
        this.dataSource = new MatTableDataSource(y);
        //this.dummyObjectArray = this.data;
        //document.getElementById("id01").innerHTML =y[1].id;
      }
      catch (err) {
        console.log(err)
      }
      //this.dummyObjectArray = this.data;
      //document.getElementById("id01").innerHTML =y[1].id;
    }
  }

  async sendRequest() {
    const data = JSON.stringify({ "username": "user", "token": "12345" });
    this.xhr = new XMLHttpRequest();
    //this.xhr.withCredentials = true;
    this.xhr.onreadystatechange = this.checkRequest.bind(this);
    this.xhr.open("GET", "http://127.0.0.1:8081/get");
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    this.xhr.send(data);

  }

  async updateValue() {
    const data = JSON.stringify({ "username": "user", "token": "12345" });
    this.xhr = new XMLHttpRequest();
    //this.xhr.withCredentials = true;
    this.xhr.onreadystatechange = this.checkRequest.bind(this);
    this.xhr.open("GET", "http://127.0.0.1:8081/update?articel_id=1&number=2&amount=999");
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    this.xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    this.xhr.send(data);

  }

  async exportList() {
    const data = JSON.stringify({ "username": "user", "token": "12345" });
    axios.post('http://127.0.0.1:8081/insertlist', JSON.stringify(this.data_json))
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }



  public dummyObjectArray: any = [
    {
      age: 56,
      name: 'blue',
    }
  ]


  toogleModal(listIndex: number, expanded?: boolean): void {
    // reset
    this.dummyObjectArray.forEach((a: any, index: any) => {
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













