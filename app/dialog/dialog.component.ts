import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  standalone: true,
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  modalTitle: string;
  modalMessage: string;
  modalType: ModalType = ModalType.INFO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public matdialog:MatDialog) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
    this.modalType = data.type;

    console.log(data)
  }

}
export enum ModalType {
  INFO = 'info',
  WARN = 'warn'
}


