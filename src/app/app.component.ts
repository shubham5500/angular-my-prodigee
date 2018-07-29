import { Component , OnInit , EventEmitter } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { UserServices } from './services/user.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  items : Array<any> = [];
  flag : boolean;

  constructor(private route : ActivatedRoute,
               public userServices : UserServices,
                public router : Router){
                this.authLogin();
  }
  ngOnInit(){
    this.checkLogin();
    document.addEventListener('keydown',function(e){
      window.focus();
      let charCode = String.fromCharCode(e.which).toLowerCase();
      if((e.ctrlKey || e.metaKey) && charCode === 'p'){
        e.preventDefault();
      }
    });
  }

  dashboardData(){
    this.userServices.dashboardServices().subscribe(
      (success)=>{
         localStorage.setItem('prodigeeData' , JSON.stringify(success.data));
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  checkLogin(){
    if(localStorage.getItem('prodigeeData')){
      this.dashboardData();
      this.flag = true;
    }
  }

  layoutFlag(data: boolean){
    this.flag = data;
  }

  authLogin(){
    let loginDetail = localStorage.getItem('prodigeeData');
    if(!loginDetail){
      this.router.navigate(['/']);
      this.layoutFlag(false);
    }
  }
}
