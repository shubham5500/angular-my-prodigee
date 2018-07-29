import { Component, OnInit, AfterViewInit , ViewChild , NgModule} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserServices } from '../services/user.services';
import { MatProgressBarModule } from '@angular/material';
import { FirstSlideComponent } from '../first-slide/first-slide.component';
import { SecondSlideComponent } from '../second-slide/second-slide.component';
import { AppComponent } from '../app.component';
import { DomSanitizer } from '@angular/platform-browser';
@NgModule({
  imports: [
    MatProgressBarModule
  ]
})
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  canvas: any;
  ctx: any;
  loading = false;
  modules = [];
  constructor(public router: ActivatedRoute,
              public userServices : UserServices,
              public appComponent : AppComponent,
              private sanitizer : DomSanitizer) {}
  ngOnInit() {
      this.dashboardData();
  }

  ngAfterViewInit() {
    this.appComponent.layoutFlag(true);
  }

  dashboardData(){
    this.router.params.subscribe(
      (params)=>{
        this.modules = JSON.parse(localStorage.getItem('prodigeeData')).module;
      }
    )
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userServices.baseUrl}${image}')`);
  }
}
