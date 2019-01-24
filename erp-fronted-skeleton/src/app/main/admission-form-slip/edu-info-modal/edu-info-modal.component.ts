import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edu-info-modal',
  templateUrl: './edu-info-modal.component.html',
  styleUrls: ['./edu-info-modal.component.scss']
})
export class EduInfoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EduInfoModalComponent>) { }

  ngOnInit() {
  }

}
