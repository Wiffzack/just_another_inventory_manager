import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrl: './qr-gen.component.css'
})
export class QrGenComponent {
  constructor() { }

  color:any;

  ngOnInit() { }

  userInput = "123";

  widths = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
  selectedWidth = this.widths[3];

  fontSizes = [1, 2, 3, 4, 5];
  selectedFontSize = this.fontSizes[0];

  margins = [0, 5, 10, 12, 14, 16, 18, 20];
  selectedMargins = this.margins[0];

  colorDark = "#000000ff";
  colorLight = "#ffffffff";
}
