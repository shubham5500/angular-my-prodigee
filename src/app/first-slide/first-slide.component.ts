import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';
import { Router } from '@angular/router';
import { MainDialogComponent } from "../main-dialog/main-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-first-slide',
  templateUrl: './first-slide.component.html',
  styleUrls: ['./first-slide.component.css']
})

export class FirstSlideComponent implements OnInit {

  constructor(public userService : UserServices,
              public router : Router,
              private dialog: MatDialog) { }

  loading = false;
  dashboard;
  studentScoreDate;
  studentRank;
  studentRankDate;

  ngOnInit() {
    this.firstSlideData();
    this.getRank();
  }

  public firstSlideData(){
    this.dashboard = JSON.parse(localStorage.getItem('prodigeeData')).dashboard;
    this.studentScoreDate = this.dashboard.score_date * 1000;
  }

  randomQuiz(){
    let classId = this.dashboard.class_id;
    this.router.navigate(['/quiz/0' , ''+classId+''] , {
      fragment : 'random-quiz'
    });

    // this.loading = true;
    // let classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;
    // this.userService.randomQuizService(classId).subscribe(
    //   (success)=>{
    //     this.loading = false;
    //     let submoduleId = success.data[0].submodule_id;
        
    //   },
    //   (error)=>{
    //     this.loading = false;
    //     console.log(error);
    //   }
    // )
  }

  getRank(){
    this.userService.rankServices().subscribe(
      (success)=>{
        let data = success.data.date.toString();
        this.studentRankDate = data * 1000;
        this.studentRank = success.data.rank.toString();
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onProdigeeScore(){
    this.dialog.open(MainDialogComponent, {
      data: 'chart',
      width: '500px'
    });
  }

}
