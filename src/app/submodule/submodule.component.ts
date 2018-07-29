import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { UserServices } from '../services/user.services';
import { FirstSlideComponent } from '../first-slide/first-slide.component';
import { SecondSlideComponent } from '../second-slide/second-slide.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-submodule',
  templateUrl: './submodule.component.html',
  styleUrls: ['./submodule.component.css']
})
export class SubmoduleComponent implements OnInit {

  constructor(public userService : UserServices , 
              public activatedRoute : ActivatedRoute,
              private sanitizer : DomSanitizer) { 
              }

  submodules = [];
  loading = false;
  mainModuleName;
  categoryModule;
  classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;

  ngOnInit() {
    this.getSubmoduleData();
    console.log(this.classId);
  }
  getSubmoduleData(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.submodules = [];
        this.loading = true;
        this.userService.submoduleService(params['id']).subscribe(
          (success)=>{
            this.loading = false;
            this.submodules = success.data;
            this.mainModuleName = success.data[0].module_name;
            if(this.activatedRoute.snapshot.fragment){
              this.categoryModule = this.activatedRoute.snapshot.fragment;
            }else{
              this.categoryModule = null;
            }
          },
          (error)=>{
            this.loading = false;
          }
        )
      }
    )
  }

  getBackground(image){
    return this.sanitizer.bypassSecurityTrustStyle(`url('${this.userService.baseUrl}${image}')`);
  }

}
