import { Injectable, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Injectable({
  providedIn: 'root'
})
export class SingletonAService {

  main: any;
  device:any;


  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  ngAfterViewInit(): void {

  }

  constructor() {
    this.main = SingletonAService;
  }
}
