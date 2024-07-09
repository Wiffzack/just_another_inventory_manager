import { Injectable, ViewChild } from '@angular/core';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';

@Injectable({
  providedIn: 'root'
})
export class SingletonAService {

  main: any;
  device:any;
  address="https://192.168.1.155/?id="


  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  ngAfterViewInit(): void {

  }

  constructor() {
    this.main = SingletonAService;
  }
}
