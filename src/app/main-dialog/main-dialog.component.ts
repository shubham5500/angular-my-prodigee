import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from "@angular/platform-browser";
import { MatDialogRef , MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { QuizTestComponent } from '../quiz-test/quiz-test.component';
import { LoginService } from '../services/login.service';
import { UserServices } from '../services/user.services';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-dialog',
  templateUrl: './main-dialog.component.html',
  styleUrls: ['./main-dialog.component.css']
})
export class MainDialogComponent implements OnInit {
  @ViewChild('iframe') iframe: ElementRef;

  timeTable;
  otpDetail;
  resetForm;
  pdfData;
  loading = false;
  i = 0;
  profileData;
  profileForm: FormGroup;
  fileImage;

  // for change number
  newNumber;
  oldNumber
  checkOtpNumber;

  // ask question ans feedback
  askInput;
  feedbackInput

  // quiz result
  questionAndAnswer = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
                                       public dialogRef : MatDialogRef<MainDialogComponent>,
                                       private sanitizer: DomSanitizer,
                                       public router : Router,
                                       public snackBar : MatSnackBar,
                                       public loginService : LoginService,
                                       public userService : UserServices,
                                       private dialog: MatDialog,
                                       private el: ElementRef,
                                       private render: Renderer2){

                                       }

  ngOnInit() {
    console.log(this.data);
    this.timeTable = this.data;
    if(this.data == 'reset-password'){
      this.createResetPasswordForm();
    }else

    if(this.data.pdfData){
      this.loading = true;
      this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.loginService.baseUrl}/${this.data.pdfData}&embedded=true&innerframe=true`)
      setTimeout(()=>{
        this.loading = false;
      }, 5000);
    }else

    if(this.data == 'profile'){
      this.profileData = JSON.parse(localStorage.getItem('prodigeeData')).dashboard;
      this.profileFormInitialize();
    }else

    if(this.data.flag == 'change-number-otp'){
      this.newNumber = this.data.number;
    }else

    if(this.data == 'change-number'){
      this.oldNumber = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.mobile;
    }else

    if(this.data.result_object){
      this.questionAndAnswer = this.data.question_with_answer;
      this.questionAndAnswer = this.questionAndAnswer.map((value)=>{
        value.user_ans_value = value[value.user_answer];
        value.correct_ans_value = value[value.answer];
        return value;
      })
    }
  }

  ngAfterViewInit(){
    if(this.data.pdfData){
      let timeout;
      const iframe = document.getElementById('my-iframe');
      var myConfObj = {
        iframeMouseOver : false
      }
      window.addEventListener('blur',function(e){
        if(myConfObj.iframeMouseOver){
          setTimeout(()=>{
            iframe.blur();
            window.focus();
          });
        }
      });
      iframe.addEventListener('mouseover',function(){
        window.focus();
        myConfObj.iframeMouseOver = true;
      });
      iframe.addEventListener('mouseout',function(){
        window.focus();
        myConfObj.iframeMouseOver = false;
      });  
    }
  }

  onChangeFileImage(ev){
    var file = ev.srcElement.files[0];
    if(file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif'){
      this.getBase64Image(file).then((response)=>{
        this.fileImage = response;
      }).catch((err)=>{
        console.log(err);
      });
    }else{
      return;
    }
  }

  private getBase64Image(file){
    return new Promise((resolve, reject)=>{
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = ()=>{
        resolve(reader.result);
      }
      reader.onerror = (error)=>{
        reject(error);
      }
    });
  }

  profileFormInitialize(){
    this.profileForm = new FormGroup({
      'name': new FormControl(this.profileData.name, Validators.required),
      'fatherName': new FormControl(this.profileData.father_name, Validators.required),
      'montherName': new FormControl(this.profileData.mother_name, Validators.required),
      'gender': new FormControl(this.profileData.gender, Validators.required),
      'details': new FormControl(this.profileData.details, Validators.required),
    });
  }

  quizPlay(data){
    this.router.navigate(['quiz-test' , data.id]);
  }

  onLoadIframe(){
    this.i = this.i + 1;
    if(this.i == 1){
      this.loading = false;
    }
  }

  logout(){
    localStorage.removeItem('prodigeeData');
    this.router.navigate(['/']);
  }

  checkOtp(mobile){
    this.loginService.checkOtp(mobile , this.otpDetail).subscribe(
      (success)=>{
        this.dialogRef.close();
        this.snackBar.open(''+success.message+'' , 'OK' , {
          duration: 3000
        });
      },
      (error)=>{
        this.snackBar.open(''+error.json().message+'' , 'OK' , {
          duration: 3000
        });
      }
    )
  }

  createResetPasswordForm(){
    this.resetForm = new FormGroup({
      'oldpassword' : new FormControl('' , Validators.required ),
      'newpassword' : new FormControl('' , Validators.required),
      'confirmpassword' : new FormControl('' , Validators.required),
    })
  }

  reset(){
    let oldpwd = this.resetForm.value.oldpassword;
    let newpwd = this.resetForm.value.newpassword;
    let confirmpwd = this.resetForm.value.confirmpassword;
    if(newpwd == confirmpwd){
      this.userService.resetPassword(oldpwd , newpwd, confirmpwd).subscribe(
        (success)=>{
          this.resetForm.reset();
          console.log(success);
          this.snackBar.open(''+success.message+'', 'OK', {
            duration: 3000
          });
        },
        (error)=>{
          this.snackBar.open(''+error.json().message+'', 'OK', {
            duration: 3000
          });
          console.log(error);
        }
      )
    }else{
      this.snackBar.open('Password do not match', 'OK', {
        duration: 3000
      });
    }
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

  onUpdateProfile(){
    let value = this.profileForm.value;
    if(this.profileForm.valid){
      this.loading = true;
      this.userService.editProfile(value, this.fileImage)
          .subscribe((success)=>{
            this.loading = false;
            localStorage.setItem('prodigeeData', JSON.stringify(success.data));
            this.snackBar.open('Profile update successfully', 'OK', {
              duration: 2000
            });
          }, (error)=>{
            this.loading = false;
            console.log(error);
            this.snackBar.open(error.json().message, 'OK', {
              duration: 2000
            });
          });
    }else{
      this.snackBar.open('Field is required', 'OK', {
        duration: 2000
      });
    }
  }

  onChangeNumber(){
    if(this.newNumber){
      this.loading = true;
      this.userService.changeNumber(this.newNumber)
          .subscribe((success)=>{
            this.loading = false;
            console.log(success);
            let data  = {
              flag: 'change-number-otp',
              number: this.newNumber
            };
            this.dialogRef.close();
            let dialogRef = this.dialog.open(MainDialogComponent , {
              disableClose:true,
              data : data
            });

          }, (error)=>{
            this.loading = false
            console.log(error);
            this.snackBar.open(error.json().message, 'OK', {
              duration: 2000
            });
          })
    }else{
      this.snackBar.open('Field is required', 'OK', {
        duration: 2000
      });
    }
  }

  onCheckNumberOtp(){
    // let json = JSON.parse(localStorage.getItem('prodigeeData'));
    // json.dashboard.mobile = this.newNumber;
    // console.log(json);
    // return;
    if(this.checkOtpNumber){
      this.loading = true;
      this.userService.checkNumber(this.newNumber, this.checkOtpNumber)
          .subscribe((success)=>{
            this.loading = false;
            console.log(success);

            let json = JSON.parse(localStorage.getItem('prodigeeData'));
            json.dashboard.mobile = this.newNumber;
            localStorage.setItem('prodigeeData', JSON.stringify(json));

            this.dialogRef.close();
            this.snackBar.open(success.message, 'OK', {
              duration: 2000
            });


          }, (error)=>{
            this.loading = false
            console.log(error);
            this.snackBar.open(error.json().message, 'OK', {
              duration: 2000
            });
          })
    }else{
      this.snackBar.open('Field is required', 'OK', {
        duration: 2000
      });
    }
  }

  onSubmitAsk(){
    if(this.askInput){
      this.loading = true;
      this.userService.askQuestion(this.askInput)
          .subscribe((success)=>{
            this.loading = false;
            console.log(success);
            this.dialogRef.close();
            this.snackBar.open(success.message, 'OK', {
              duration: 2000
            });
          }, (error)=>{
            this.loading = false
            console.log(error);
            this.snackBar.open(error.json().message, 'OK', {
              duration: 2000
            });
          })
    }else{
      this.snackBar.open('Field is required', 'OK', {
        duration: 2000
      });
    }
  }

  onSubmitAskAnsFeedback(){
    if(this.feedbackInput){
      this.loading = true;
      this.userService.feedback(this.feedbackInput)
          .subscribe((success)=>{
            this.loading = false;
            console.log(success);
            this.dialogRef.close();
            this.snackBar.open(success.message, 'OK', {
              duration: 2000
            });
          }, (error)=>{
            this.loading = false
            console.log(error);
            this.snackBar.open(error.json().message, 'OK', {
              duration: 2000
            });
          })
    }else{
      this.snackBar.open('Field is required', 'OK', {
        duration: 2000
      });
    }
  }

}
