import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Result } from '@zxing/library';
import { SingletonAService } from './singleton-a.service'; 
import { Subscription } from 'rxjs';


import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventar_gui';
  mobile:boolean;

  isOpen = false;
  resize: Subscription;

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  constructor(private route: ActivatedRoute,public single:SingletonAService,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobile =  this.single.mobile = window.navigator.userAgent.toLowerCase().includes("mobi");
    console.log(this.single.mobile)

   }

}
