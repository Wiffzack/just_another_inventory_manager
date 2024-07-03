import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createWorker } from 'tesseract.js';
import { AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import axios from 'axios';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeService } from 'ngx-scanner-qrcode';
import { SingletonAService } from '../singleton-a.service';
@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {

  captures: string[] = [];
  error: any;
  isCaptured: boolean = false;
  ocr_text: any;
  first_input: any;
  second_input: any;
  second_input_value: number;

  constraints:any;

  worker: any;
  constructor(public singleton: SingletonAService,private qrcode: NgxScannerQrcodeService,public route: ActivatedRoute, public dialog: MatDialog, private _router: Router) {
  }
  name = 'Angular ';

  articles = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;


  PopUp(event: Event, element: HTMLDivElement) {
    // element.classList.remove('popup');
    // element.classList.add('test');
    // console.log(element.classList);
    element.classList.toggle('is-visible');
  }

  openModal(title: string, message: string) {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: title,
      message: message
    };
    dialogConfig.minWidth = 400;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      } else {
        console.log(result)
      }

    });
  }
  toggleSecondInput() {
    this.second_input.classList.toggle('is-visible');
  }

  reload(){
    location.reload();
  }

  add_new_entry() {
    let new_entry = {
      "name": this.ocr_text,
      "number": this.second_input_value || 1,
    }
    axios.post('http://127.0.0.1:8081/addentry', JSON.stringify(new_entry))
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    this._router.navigate(['ocr']);
    location.reload();
  }

  add_to_db(text: string, event: any, element: any) {
    console.log(text)
    this.ocr_text = text.trim();
    //this.popup.showAsComponent("input.value")
    this.PopUp(event, element)
    //this.openModal("Success", text)
  }

  blackwhite(imageData:any){
      for (var index = 0; index < imageData.data.length; index += 4) {
          var v = (imageData.data[index] + imageData.data[index + 1] + imageData.data[index + 2]) / 3;
          imageData.data[index] = v;
          imageData.data[index + 1] = v;
          imageData.data[index + 2] = v;
      }
      return imageData;
  }

  checkcamera(){
    navigator.mediaDevices.enumerateDevices().then((e)=>{
      console.log(e)
    })
  }

  async ocr(image: any, event: any, element: any) {
    this.worker = await createWorker('eng', 1, {
      logger: (m) => console.log(m),
    });
    const ret = await this.worker.recognize(image);
    if (ret.data.text) {
      this.add_to_db(ret.data.text, event, element)
    }else{
      this.removeCurrent()
    }
    await this.worker.terminate();
  }

  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  video: ElementRef
  @ViewChild("canvas")
  canvas: ElementRef

  public handle(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      console.log(devices)
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }

    if (fn === 'start') {
      action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    } else {
      action[fn]().subscribe((r: any) => console.log(fn, r), alert);
    }
  }

  async ngAfterViewInit() {

    this.checkcamera();

    this.second_input = document.getElementById("second_popup");
    this.first_input = document.getElementById("first_popup");
    await this.setupDevices();
    //this.ocr();
  }

  ngOnDestroy() {
    try{
    this.video.nativeElement.pause();
    this.video.nativeElement.srcObject = "";
    }catch(e){
      console.log('Error');
    }
  }

  async setupDevices() {
    this.constraints = {
      video: {
        // these both not work with old constraints...it's new syntax
        deviceId:  this.singleton.device
        // deviceId: { exact: this.videoSources[0].id }
      }
    };
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
        if (stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    //this.isCaptured = true;
    this.setPhoto(0, "", this.first_input)
  }

  removeCurrent() {
    this.isCaptured = false;
  }

  setPhoto(idx: number, event: any, element: any) {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.captures[idx];
    console.log(image)
    this.ocr(image, event, element);
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }

}
