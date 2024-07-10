import { Injectable, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Injectable({
  providedIn: 'root'
})
export class SingletonAService {

  main: any;
  device:any;
  address="https://127.0.0.1:4200/edit?id=";
  mobile:any;


  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  ngAfterViewInit(): void {

  }

  constructor() {
    this.main = SingletonAService;
  }
}
