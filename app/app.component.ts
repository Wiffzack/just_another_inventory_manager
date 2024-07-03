import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Result } from '@zxing/library';
import { SingletonAService } from './singleton-a.service'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventar_gui';

  constructor(private route: ActivatedRoute,public single:SingletonAService) { }

}
