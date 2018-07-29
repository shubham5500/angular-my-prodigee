import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  submoduleId;
  classId;
  constructor(public router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.categoryList();
  } 

  categoryList(){
    this.activatedRoute.params.subscribe(
      (params)=>{
        this.submoduleId = params['submoduleId']
        this.classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;
      }
    );
  }
}
