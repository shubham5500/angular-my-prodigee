import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MainDialogComponent } from '../main-dialog/main-dialog.component';
import { UserServices } from '../services/user.services';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  loading;
  modules = {};
  constructor(public router : Router,
              public activatedRoute : ActivatedRoute,
              public matDialog : MatDialog,
              public userService : UserServices) { }

  ngOnInit() {
    this.modules = JSON.parse(localStorage.getItem('prodigeeData')).module;
  }

  categoryModule(id , categoryName){
    this.router.navigate(['/submodule/' , id] , { fragment : categoryName });
  }

  timeTable(){
    let classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;
    this.userService.timeTableService(classId).subscribe(
      (success)=>{
        let data  = {
          table: success.text(),
          text: 'table'
        }
        this.matDialog.open(MainDialogComponent , {
          data : data,
          minWidth: '300px'
        })
      }
    )
  }

  onProfile(){
    this.matDialog.open(MainDialogComponent, {
      data: 'profile',
      width: '500px',
    });
  }

  randomQuiz(){
    // this.loading = true;
    let classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;
    this.router.navigate(['/quiz/0' , ''+classId+''] , {
      fragment : 'random-quiz'
    });
    // this.userService.randomQuizService(classId).subscribe(
    //   (success)=>{
    //     this.loading = false;
    //     let submoduleId = success.data[0].submodule_id;
    //     this.router.navigate(['/quiz' , ''+submoduleId+'' , ''+classId+''] , {
    //       fragment : 'random-quiz'
    //     })
    //   },
    //   (error)=>{
    //     this.loading = false;
    //     console.log(error);
    //   }
    // )
  }

  logout(){
    this.matDialog.open(MainDialogComponent , {
      data : 'logout'
    })
  }

  reset(){
    this.matDialog.open(MainDialogComponent , {
      data : 'reset-password',
      width : '400px'
    })
  }

  changeNumber(){
    this.matDialog.open(MainDialogComponent , {
      data : 'change-number',
      width : '400px'
    })
  }

  onAskAndFeedBack(message){
    let data = message;
    this.matDialog.open(MainDialogComponent , {
      data : data,
      width : '400px'
    })
  }
}
