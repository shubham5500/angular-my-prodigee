import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { UserServices } from '../services/user.services';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-reading-material',
  templateUrl: './reading-material.component.html',
  styleUrls: ['./reading-material.component.css']
})
export class ReadingMaterialComponent implements OnInit {

  loading : Boolean = false;
  readingMaterialData = [];

  constructor(public userServices : UserServices, 
              public router : Router,
              public dialog : MatDialog,
              public activatedRoute : ActivatedRoute,
              private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.readingMaterialList();
  }

  readingMaterialList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.loading = true;
        let submoduleId = params['submoduleId'];
        let classId = params['classId'];
        this.userServices.categoryListService(submoduleId , classId , 'material-list').subscribe(
          (success)=>{
            this.loading = false;
            console.log(success);
            this.readingMaterialData = success.data;
          },
          (error)=>{
            this.loading = false;
            console.log(error);
          }
        );
      }
    )
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }

  openMainDialog(data){
    if(data.pdf){
      this.onViewDocument(data.pdf);
      return;
    }
    this.dialog.open(MainDialogComponent  ,{
      width : '400px',
      data : data
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
}
