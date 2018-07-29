import { Component, OnInit } from '@angular/core';
import { UserServices } from '../services/user.services';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-second-slide',
  templateUrl: './second-slide.component.html',
  styleUrls: ['./second-slide.component.css']
})
export class SecondSlideComponent implements OnInit {

  constructor(public userService : UserServices) { }

  ctx : any;
  topStudentData = [];
  baseUrl;
  className;
  dashboard= {};
  showChart = false;
  monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  ngOnInit() {
      this.getTopStudent();

      if(localStorage.getItem('prodigeeData')){
        this.dashboard = JSON.parse(localStorage.getItem('prodigeeData')).dashboard;
      }

      if(!this.dashboard['scores'] || !this.dashboard['months']){
        this.showChart = false;
        this.dashboard['scores'] = '';
        this.dashboard['months'] = '';
        document.getElementById('canvas').style.display = 'none';
      }else{
        this.showChart = false;
        this.getChart();
      }
  }
  getChart(){
      var scores = this.dashboard['scores'].split(',').slice(0, 3);
      var months = this.dashboard['months'].split(',').slice(0, 3);
      var monthsArray = [];

      for(var i= 0; i< months.length; i++){
        monthsArray.push(this.monthName[new Date(parseInt(months[i])*1000).getMonth()]);
      }
        setTimeout(()=>{
        this.showChart = true;
        this.ctx = new Chart(document.getElementById("canvas"), {
          "type": "bar",
          "data": {
              "labels": monthsArray,
              "datasets": [{
                  "label": "My First Dataset",
                  "data": scores,
                  "fill": false,
                  "backgroundColor": ["rgba(68, 14, 24, 1)", "rgba(68, 14, 24, 1)", "rgba(68, 14, 24, 1)", "rgba(68, 14, 24, 1)", "rgba(68, 14, 24, 1)"],
                  "borderColor": ["rgb(68, 14, 24)", "rgb(68, 14, 24)", "rgb(68, 14, 24)", "rgb(68, 14, 24)", "rgb(68, 14, 24)"],
                  "borderWidth": 1
              }]
          },
          "options": {
              "scales": {
                  "yAxes": [{
                      "ticks": {
                          "beginAtZero": true,
                            'stepSize' : 10
                      },
                      'gridLines' : {
                      'color' : "rgba(0, 0, 0, 0)",
                    }
                  }],
                  'xAxes' : [{
                    'barThickness' : 7,
                    'gridLines' : {
                      'color' : "rgba(134, 134, 134, 0.3)",
                    }

                }]
              },
              'legend': {
                'display': false
            }
          },
          "configuration": {
            "barThickness" : 1
          }
    });
    }, 500);

  }

  getTopStudent(){
    let classId = JSON.parse(localStorage.getItem('prodigeeData')).dashboard.class_id;
    this.baseUrl = this.userService.baseUrl;
    this.userService.topStudentService(classId)
    .subscribe((success)=>{
      this.topStudentData = success.data;
      this.className = this.topStudentData[0].class_name;
      console.log(success);
    },(error)=>{
      console.log(error);
    })
  }
}
