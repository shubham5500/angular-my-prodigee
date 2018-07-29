import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
declare var jquery : any;
declare var $ : any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title : any;
  flag = true;
  constructor(public router : Router , 
              public activatedRoute : ActivatedRoute) { }
  
  ngOnInit() {
    this.menuToggle();
  }

  menuToggle(){
     $('.mynavbar .nav-link').on('click' , function(){
      if(!$('.main_sidebar').hasClass('menu_wide')){
        $('.main_sidebar').addClass('menu_wide');
      }else{
        $('.main_sidebar').removeClass('menu_wide');
        $('.collapse').collapse('hide');
      }
    });
    $('body').on('click' , function(e){
      if(!$(e.target).is("a.menu_anchor , img.menu_img , li.menu_li , img.nav_link_img , a.nav-link")){
        $('.main_sidebar').removeClass('menu_wide');
        $('.collapse').collapse('hide');
      }
    })
    $('.menu_li .menu_img').on('click', function(){
      if(!$('.main_sidebar').hasClass('menu_wide')){
        $('.main_sidebar').addClass('menu_wide');
      }
    })
  }

  dashboardReload(){
    console.log('reload');
    this.router.navigate(['/dashboard'] , {
      relativeTo : this.activatedRoute
    })
  }
}
