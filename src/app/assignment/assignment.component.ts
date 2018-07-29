import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { UserServices } from '../services/user.services';
import { MatDialog } from '@angular/material';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  
  loading : Boolean = false;
  assignmentData = [];

  constructor(public router : Router, 
              public activatedRoute : ActivatedRoute,
              public userServices : UserServices,
              public dialog : MatDialog, 
              private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.assignmentList();
  }
  assignmentList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.loading = true;
        let submoduleId = params['submoduleId'];
        let classId = params['classId'];
        this.userServices.categoryListService(submoduleId , classId , 'assinment-list').subscribe(
          (success)=>{
            this.loading = false;
            this.assignmentData = success.data;
            console.log(success);
          },
          (error)=>{
            this.loading = false;
            console.log(error);
          }
        );
      }
    );
  }

  openMainDialog(assignmentData){
    if(assignmentData.pdf){
      this.onViewDocument(assignmentData.pdf);
      return;
    }
    this.dialog.open(MainDialogComponent , {
      width : '400px',
      data : assignmentData
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

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }
}
