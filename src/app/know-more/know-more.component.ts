import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServices } from '../services/user.services';
import { MatDialog } from '@angular/material';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-know-more',
  templateUrl: './know-more.component.html',
  styleUrls: ['./know-more.component.css']
})
export class KnowMoreComponent implements OnInit {

  knowMoreListData = [];
  loading;

  constructor(public router : Router,
              public activatedRoute : ActivatedRoute,
              public dialog : MatDialog,
              public userService : UserServices,
              private sanitizer : DomSanitizer) { }

  ngOnInit() {
    this.knowMoreList();
  }

  knowMoreList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.loading = true;
        let submoduleId = params['submoduleId'];
        let classId = params['classId'];
        this.userService.categoryListService(submoduleId , classId , 'know-more').subscribe(
          (success)=>{
            this.loading = false;
            this.knowMoreListData = success.data;
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
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userService.baseUrl}${image}')`);
  }

  openMainDialog(data){
    this.dialog.open(MainDialogComponent , {
      data : data,
      width: '400px'
    })
  }
}
