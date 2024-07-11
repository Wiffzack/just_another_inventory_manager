import { Component, ViewChild } from '@angular/core';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeService,
  NgxScannerQrcodeComponent,
  ScannerQRCodeSelectedFiles,
} from 'ngx-scanner-qrcode';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SingletonAService } from '../singleton-a.service';

@Component({
  selector: 'app-qr-scan',
  templateUrl: './qr-scan.component.html',
  styleUrl: './qr-scan.component.css'
})
export class QrScanComponent {

  videoDevice: any;
  back_camera: any;
  camera_list: any;
  constructor(public singleton: SingletonAService, private qrcode: NgxScannerQrcodeService, private route: ActivatedRoute, private _router: Router) { }


  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#front_and_back_camera
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
    // canvasStyles: [
    //   { /* layer */
    //     lineWidth: 1,
    //     fillStyle: '#00950685',
    //     strokeStyle: '#00950685',
    //   },
    //   { /* text */
    //     font: '17px serif',
    //     fillStyle: '#ff0000',
    //     strokeStyle: '#ff0000',
    //   }
    // ],
  };

  public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
  public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public percentage = 80;
  public quality = 100;

  ngOnDestroy() {
    this.handle(this.action, 'stop');
    this.action.pause();
    this.action.src = "";
  }

  setVideoDevice(device: any) {
    console.log(device)
    this.singleton.device = device;
  }

  async getcamera() {
    const constraints2 = {
      video: {
        facingMode: {
          ideal: "environment"
        }
      }
    };
    await navigator.mediaDevices.getUserMedia({ video: true });
    const stream:any = await navigator.mediaDevices.getUserMedia(constraints2);
    if (stream) {
      this.camera_list = stream;
    }
  }

  async getcameraold() {
    await navigator.mediaDevices.enumerateDevices().then(function (devices) {
      if (devices.length != 0) {
        this.camera_list = devices;
      }
      /*       for(var i = 0; i < devices.length; i ++){
                var device = devices[i];
                console.log(device)
            }; */
    });
  }

  ngAfterViewInit(): void {
    this.getcamera();
    this.getcameraold();

    try {
      this.action.isReady.subscribe((res: any) => {
        this.handle(this.action, 'start');
      });
    } catch (e) {
      console.log('Error');
    }

  }

  public isValidHttpUrl(string: any) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }

  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    e && action && action.pause();
    console.log(e);
    //  "https://192.168.1.155/edit?id=2"
    console.log(e[0].value.split("?id=")[1])
    let url_cache = e[0].value.split("?id=")[1];
    this._router.navigate(['edit'], { queryParams: { url: url_cache } })
    /* if(this.isValidHttpUrl(url_cache)){
    } */
  }

  public handle(action: any, fn: string): void {


    const constraints = {
      video: {
        facingMode: {
          ideal: "environment"
        }
      }
    };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        console.log(stream)
        const playDeviceFacingBack = (devices: any[]) => {
          // front camera or back camera check here!

          const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
          //if()
          //alert(device ? device.deviceId : devices[1].deviceId)
            action.playDevice(this.camera_list);
        
        }

        if (fn === 'start') {
          action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
        } else {
          action[fn]().subscribe((r: any) => {
            console.log(fn, r)

          }, alert);
        }
      })
      .catch(console.error);
  }

  public onDowload(action: NgxScannerQrcodeComponent) {
    action.download().subscribe(console.log, alert);
  }

  public onSelects(files: any) {
    this.qrcode.loadFiles(files, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      this.qrCodeResult = res;
    });
  }

  public onSelects2(files: any) {
    this.qrcode.loadFilesToScan(files, this.config, this.percentage, this.quality).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
      console.log(res);
      this.qrCodeResult2 = res;
    });
  }

  public onGetConstraints() {
    const constrains = this.action.getConstraints();
    console.log(constrains);
  }

  public applyConstraints() {
    const constrains = this.action.applyConstraints({
      ...this.action.getConstraints(),
      width: 510
    });
    console.log(constrains);
  }

}
