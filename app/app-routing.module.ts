import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInventarComponent } from './edit-inventar/edit-inventar.component';
import { AppComponent } from './app.component';
import { QrScanComponent } from './qr-scan/qr-scan.component';
import { SearchComponent } from './search/search.component';
import { OcrComponent } from './ocr/ocr.component';
import { QrGenComponent } from './qr-gen/qr-gen.component';
//const routes: Routes = [];
/* 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: QrScanComponent },
  { path: 'news',
    component: EditInventarComponent,
    resolve: {
      news: EditInventarComponent
    }
  }
]; */
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'edit', component: EditInventarComponent },
      { path: 'scan', component: QrScanComponent },
      { path: 'search', component: SearchComponent },
      { path: 'ocr', component: OcrComponent },
      { path: 'qrgen', component: QrGenComponent },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})

export class AppRoutingModule { }

