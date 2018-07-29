import { Component, OnInit , NgModule, EventEmitter , Output } from '@angular/core';
import { FormGroup , FormControl , Validators } from '@angular/forms';
import { MatButtonModule , MatSnackBar, MatInput, MatDialog, MatDialogRef } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router , ActivatedRoute } from "@angular/router";
import { LoginService } from '../services/login.service';
import { AppComponent } from '../app.component';
import { UserServices } from '../services/user.services';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
@NgModule({
  imports : [
    MatButtonModule,
    MatSnackBar,
    MatInput
  ]
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm : FormGroup;
  formData;
  forgotForm : FormGroup;
  mainForm = '';
  constructor(public snackBar : MatSnackBar ,
              private loginService : LoginService ,
              private router : Router,
              public activatedRoute : ActivatedRoute,
              public appComponent : AppComponent,
              public userService : UserServices,
              public dialog : MatDialog) {

                // if user is login and prodigee data is exist in localStorage
                if(localStorage.getItem('prodigeeData')){
                  this.router.navigate(['/dashboard']);
                }

                this.activatedRoute.params.subscribe(
                  (params)=>{
                    this.appComponent.layoutFlag(false);
                  }
                )
              }

  ngOnInit() {
    this.createLoginForm();
    this.createForgotForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      'mobile' : new FormControl('', Validators.required),
      'password' : new FormControl('', Validators.required)
    });
  }

  createForgotForm(){
    this.forgotForm = new FormGroup({
      'forgotMobileNumber' : new FormControl('', Validators.required)
    })
  }


  login(){
    let loginForm = this.loginForm;
    let mobileNumber = this.loginForm.value.mobile;
    let password = this.loginForm.value.password;
    if(loginForm.invalid == true){
      this.openSnackBar('Email & Password is required' , 'OK');
    }else{
      this.loginService.loggingIn( mobileNumber , password )
      .subscribe(
        (success)=>{
          this.loginForm.reset();
          this.openSnackBar(''+success.message+'' , 'OK');
          this.formData = success.data;
          localStorage.setItem('prodigeeData' , JSON.stringify(success.data));
          this.router.navigate(['/dashboard']);
          this.userService.getData();
        },
        (error)=>{
          console.log(error.json());
          this.openSnackBar(''+error.json().message+'' , 'OK');
        }
      );
    }
  }

  forgot(){
    let mobileNumber = this.forgotForm.value.forgotMobileNumber;
    this.loading = true;
    this.loginService.forgotPassword(mobileNumber).subscribe(
      (success)=>{
        this.loading = false;
        this.openSnackBar(''+success.message+'', 'OK');
        let forgotModelData = {
          mobile : mobileNumber,
          name : 'forgot-password-dialog'
        }
        let dialogRef = this.dialog.open(MainDialogComponent , {
          disableClose:true,
          data : forgotModelData
        })
        dialogRef.afterClosed().subscribe(
          (result) => {
           this.forgotForm.reset();
          }
        )
      },
      (error)=>{
        this.loading = false;
        this.openSnackBar(''+error.json().message+'', 'OK');
        console.log(error.json());
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
