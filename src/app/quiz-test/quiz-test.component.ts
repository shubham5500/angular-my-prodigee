import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { UserServices } from '../services/user.services';
import { ActivatedRoute , Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';

@Component({
  selector: 'app-quiz-test',
  templateUrl: './quiz-test.component.html',
  styleUrls: ['./quiz-test.component.css']
})
export class QuizTestComponent implements OnInit {

  quizTestData = [];
  loading = false;
  optionValue;
  selectedOption;
  number = 0;
  saveAnswer = [];
  quizId;
  min;
  sec = '00';
  timeout;
  constructor(public userService : UserServices ,
              public activatedRoute : ActivatedRoute,
              public router : Router,
              public snackBar : MatSnackBar,
              private dialog: MatDialog,
              private location: Location) {
              }

  ngOnInit() {
    this.quizQuestionList();
  }
  
  quizQuestionList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.loading = true;
        this.quizId = params['quizId'];
        this.userService.categoryListService(this.quizId , '' , 'quiz-detail').subscribe(
          (success)=>{
            this.loading = false;
            this.quizTestData = success.data;
            this.min = success.data[0].time;
            this.setTimer();
          },
          (error)=>{
            this.loading = false;
            console.log(error);
          }
        )
      }
    );
  }

  setTimer(){
    this.checkSec(parseInt(this.sec) - 1);

    if(this.sec == '59'){
      this.min = (parseInt(this.min) - 1).toString();
    }

    this.timeout =  setTimeout(()=>{
      this.setTimer();
    }, 1000);

    // if time is complete
    if(parseInt(this.min) < 0){
      clearTimeout(this.timeout);
      this.min = '00';
      this.sec = '00';
      this.location.back();
      // this.router.navigate(['/quiz' , this.optionValue.submodule_id , this.optionValue.class_id]);
      this.savingAnswer();
    }
  }

  private checkSec(sec){
    if(sec < 10 && sec >= 0) {
      sec = "0" + sec;
    }
    if(sec < 0) {sec = "59"}
    this.sec = sec.toString();
  }


  setValue(data , selectedValue){
    this.optionValue = data;
    this.selectedOption = selectedValue;
  }

  savingAnswer(){
    this.userService.saveAnswerService(this.quizId , this.saveAnswer).subscribe(
      (success)=>{
        console.log(success);
        this.getPrevious();
        // this.dialog.open(MainDialogComponent , {
        //   data : success.data,
        //   width: '400px'
        // });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  getPrevious(){
    this.userService.resultService(this.quizId).subscribe(
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
  }

  submitQuestion(){
    if(this.selectedOption){
      this.saveAnswer.push({
        questionId : this.optionValue.id,
        answer : this.selectedOption,
        flag : this.selectedOption === this.optionValue.answer ? 'y' : 'n'
      });
      this.selectedOption = '';
      this.number = this.number+1;
      //if length of question exceeds
      if(this.number >= this.quizTestData.length){
        this.location.back();
        // this.router.navigate(['/quiz' , this.optionValue.submodule_id , this.optionValue.class_id]);
        //open modal here
        this.savingAnswer();
      }
    }else{
      this.snackBar.open('You must select a Option!' , 'OK' ,{
        duration : 3000
      });
    }
  }
}
