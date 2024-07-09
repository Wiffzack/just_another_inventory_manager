import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SingletonAService } from '../singleton-a.service';
@Component({
  selector: 'app-qr-gen',
  templateUrl: './qr-gen.component.html',
  styleUrl: './qr-gen.component.css'
})
export class QrGenComponent {
  constructor(public route: ActivatedRoute, public share: SingletonAService) {
    this.userInput = this.share.address;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        console.log("passed parameter: " + params['url'])
        // Defaults to 0 if no query param provided.
        this.userInput = this.share.address + params['url'];
        console.log(this.userInput)
      });
  }

  color: any;
  sub: any;
  page: any;

  userInput: string = "123";

  widths = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600];
  selectedWidth = this.widths[3];

  fontSizes = [1, 2, 3, 4, 5];
  selectedFontSize = this.fontSizes[0];

  margins = [0, 5, 10, 12, 14, 16, 18, 20];
  selectedMargins = this.margins[0];

  colorDark = "#000000ff";
  colorLight = "#ffffffff";

  ngOnInit() {
    console.log(this.share.address)
    this.userInput = this.share.address;
    this.sub = this.route
      .queryParams
      .subscribe((params) => {
        console.log("passed parameter: " + params['url'])
        // Defaults to 0 if no query param provided.
        this.userInput = this.share.address + params['url'];
        console.log(this.userInput)
      });
  }


}
