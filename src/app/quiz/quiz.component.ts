import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { UserServices } from '../services/user.services';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizListData = [];
  loading : Boolean = false;
  studentScoreDate;
  prodigeeScore;
  studentClass;
  dashboardData;
  constructor(public userServices : UserServices,
              public router : Router,
              public dialog : MatDialog,
              public activatedRoute : ActivatedRoute,
              private sanitizer : DomSanitizer) {}

  ngOnInit() {
    this.quizList();
    this.dashboardData = JSON.parse(localStorage.getItem('prodigeeData')).dashboard;
    this.prodigeeScore = this.dashboardData.score;
    this.studentClass = this.dashboardData.class;
    //this.studentScoreDate = new Date(dashboard.score_date * 1000).toLocaleDateString();
  }
  
  quizList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        let randomQuizFragment = this.activatedRoute.snapshot.fragment;
        if(randomQuizFragment){
          this.loading = true;
          let classId = params['classId'];
          this.userServices.randomQuizService(classId).subscribe(
            (success)=>{
              this.loading = false;
              console.log(success);
              this.quizListData = success.data;
            },
            (error)=>{
              this.loading = false;
              console.log(error);
            }
          )
        }else{
            this.loading = true;
            let submoduleId = params['submoduleId'];
            let classId = params['classId'];
            this.userServices.categoryListService(submoduleId , classId , 'quiz-list').subscribe(
              (success)=>{
                this.loading = false;
                console.log(success);
                this.quizListData = success.data;
              },
              (error)=>{
                this.loading = false;
                console.log(error);
              }
            )
        }
      }
    )
    ;
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }

  openMainDialog(data){
    if(data.given == 'y'){
      this.loading = true;
      this.userServices.resultService(data.id).subscribe(
        (success)=>{
          this.loading = false;
          this.dialog.open(MainDialogComponent , {
            data : success.data,
            width: '700px'
          });
        },
      (error)=>{
        this.loading = false;
        console.log(error);
      }
      )
    }else{
      this.dialog.open(MainDialogComponent , {
        data : data,
        width: '500px'
      });
    }
  }
}
