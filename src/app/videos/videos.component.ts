import { Component, OnInit , NgModule  } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { MatDialog , MatDialogRef } from '@angular/material';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { UserServices } from '../services/user.services';
import { DomSanitizer } from '@angular/platform-browser';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videoDialogRef : MatDialogRef<VideoDialogComponent>;
  loading: boolean = false;
  videoData = [];
  videoId;
  constructor(public dialog : MatDialog , 
              public router : Router , 
              public activatedRoute : ActivatedRoute,
              public userServices : UserServices,
              private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.videoList();
  }

  videoList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        let submoduleId = params['submoduleId'];
        let classId = params['classId'];
        this.loading = true;
        this.userServices.categoryListService(submoduleId, classId , 'video-list').subscribe(
          (success)=>{
            this.loading = false;
            this.videoData = success.data;
            console.log(success);
          },
          (error)=>{
            this.loading = false;
            console.log(error);
          }
        )
      }
    )
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }

  openVideoDialog(videoId , title, video){
    if(video.link){
      this.videoDialogRef = this.dialog.open(VideoDialogComponent , {
        data : {
          videoId : videoId,
          title : title,
          videoData: video
        }
      });
      return;
    }
    this.onViewDocument(video.pdf);
  }

  onViewDocument(pdf){
    let data = {
      pdfData: pdf
    }
    let dialogRef = this.dialog.open(MainDialogComponent , {
      width: '800px',
      height: '550px',
      disableClose:true,
      data : data
    });
  }


}
