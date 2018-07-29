import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserServices } from '../services/user.services';
import { MainDialogComponent } from '../main-dialog/main-dialog.component'; 
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleData = [];
  loading = false;
  constructor(private sanitizer : DomSanitizer,
              public userServices : UserServices,
              public router : Router,
              public activated: ActivatedRoute,
              public dialog : MatDialog) { }

  ngOnInit() {
    this.getArticleData();
  }

  getArticleData(){
    this.activated.params.subscribe(
      (params)=>{
        this.loading = true;
        let submoduleId = params['submoduleId'];
        let classId = params['classId'];
        this.userServices.categoryListService(submoduleId , classId, 'article-list').subscribe(
          (success)=>{
            this.loading = false;
            this.articleData = success.data;
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

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }
}
