import { Component, OnInit , OnDestroy } from '@angular/core';
import { UserServices } from '../services/user.services';
import { Router , ActivatedRoute } from '@angular/router';
import { MatDialog , MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activityListSubscription : Subscription;
  activityData = [];
  loading : Boolean = false;
  constructor(public userServices : UserServices,
              public activatedRoute : ActivatedRoute,
              public router : Router, 
              public dialog : MatDialog,
              public sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.activityList();
  }

  activityList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.loading = true;
        let classId = params['classId'];
        let submoduleId = params['submoduleId'];
        this.activityListSubscription = this.userServices
        .categoryListService(submoduleId , classId , 'activity-list').subscribe(
          (success)=>{
            this.loading = false;
            console.log(success);
            this.activityData = success.data;
          },
          (error)=>{
            this.loading = false;
            console.log(error);
          }
        );
      }
    )  
  }

  mainDialog(activityData){
    if(activityData.pdf){
      this.onViewDocument(activityData.pdf);
      return;
    }
    this.dialog.open(MainDialogComponent , {
      width: '400px',
      data : activityData
    })
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

  ngOnDestroy(){
    this.activityListSubscription.unsubscribe();
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }
}
