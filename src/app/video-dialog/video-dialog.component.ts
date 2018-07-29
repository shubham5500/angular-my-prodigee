import { Component, OnInit, Inject } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialogRef , MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.css']
})
export class VideoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private sanitizer: DomSanitizer,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<VideoDialogComponent>) { }
  videoURL;
  videoId;
  ngOnInit() {   
    this.videoId = this.data.videoId.split('=').pop();
    this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.videoId);
    console.log(this.data);
  }

  onViewDocument(pdf){
    let data = {
      pdfData: pdf
    }
    this.dialogRef.close();
    let dialogRef = this.dialog.open(MainDialogComponent , {
      width: '800px',
      height: '550px',
      disableClose:true,
      data : data
    });
  }
}
