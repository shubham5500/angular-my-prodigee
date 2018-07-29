import { Injectable } from '@angular/core';
import { Http , Response, Headers , RequestOptions ,URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class UserServices{

    data = JSON.parse(localStorage.getItem('prodigeeData'));

    constructor(public http : Http){}

    baseUrl = 'http://demo.hackerkernel.com/prodigee-test/';

    getData(){
        this.data = JSON.parse(localStorage.getItem('prodigeeData'));
    }

    dashboardServices(){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"dashboard-detail" , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        )
    }

    submoduleService(id){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"submodule/"+id , body, options).map(
            (response : Response)=>{
                return response.json();
            }
        )
    }


    categoryListService(submoduleId , classId , categoryName: String){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+categoryName+"/"+submoduleId+"/"+classId , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        );
    }

    timeTableService(quizId){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"time-table/"+quizId , body , options).map(
            (response : Response)=>{
                return response;
            }
        );
    }

    randomQuizService(classId){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"random-quiz/"+classId , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        );
    }

    saveAnswerService(quizId , answerArray){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        params.append('quiz_id' , quizId);
        for(let i=0; i < answerArray.length ; i++){
            params.append('question_id[]' , answerArray[i].questionId);
            params.append('answer[]' ,  answerArray[i].answer);
            params.append('correct_answer[]' , answerArray[i].flag);
        }
        let body = params.toString();
        return this.http.post(this.baseUrl+'save-answer' , body , options).map(
            (response: Response)=>{
                return response.json();
            }
        )
    }

    resultService(quizId){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        params.append('quiz_id' , quizId);
        let body = params.toString();
        return this.http.post(this.baseUrl+"previous-result" , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        )
    }

    topStudentService(classId){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"top-student/"+classId , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        );
    }

    rankServices(){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        let options = new RequestOptions({
            headers : header
        });
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        let body = params.toString();
        return this.http.post(this.baseUrl+"rank-student" , body , options).map(
            (response : Response)=>{
                return response.json();
            }
        )
    }

    resetPassword(oldpwd , newpwd , confirmpwd){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        let options = new RequestOptions({
            headers : header
        })
        let params = new URLSearchParams();
        params.append('Authorization' , this.data.dashboard.apikey);
        params.append('old_password' , oldpwd);
        params.append('new_password' , newpwd);
        params.append('confirm_password' , confirmpwd);
        let body = params.toString();
        return this.http.post(this.baseUrl+"reset-password" , body , options).map(
            (response)=>{
                return response.json();
            }
        )
    }

    editProfile(value, image){
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({headers: headers});
      let params = new URLSearchParams();
      params.append('Authorization', this.data.dashboard.apikey);
      params.append('name', value.name);
      params.append('fname', value.fatherName);
      params.append('mname', value.montherName);
      params.append('gender', value.gender);
      params.append('details', value.details);
      params.append('image', image ? image.split(',').pop() : image);

      return this.http.post(this.baseUrl+`profile-edit`, params, options)
                  .map((response: Response)=>{
                    return response.json();
                  })
    }

    changeNumber(mobile){
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({headers: headers});
      let params = new URLSearchParams();
      params.append('Authorization', this.data.dashboard.apikey);
      params.append('mobile', mobile);

      return this.http.post(this.baseUrl+`change-number`, params, options)
                  .map((response: Response)=>{
                    return response.json();
                  })
    }

    checkNumber(mobile, otp){
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({headers: headers});
      let params = new URLSearchParams();
      params.append('Authorization', this.data.dashboard.apikey);
      params.append('mobile', mobile);
      params.append('otp', otp);

      return this.http.post(this.baseUrl+`check-number`, params, options)
                  .map((response: Response)=>{
                    return response.json();
                  })
    }

    askQuestion(message){
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({headers: headers});
      let params = new URLSearchParams();
      params.append('Authorization', this.data.dashboard.apikey);
      params.append('question', message);

      return this.http.post(this.baseUrl+`send-question`, params, options)
                  .map((response: Response)=>{
                    return response.json();
                  })
    }

    feedback(message){
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      });
      let options = new RequestOptions({headers: headers});
      let params = new URLSearchParams();
      params.append('Authorization', this.data.dashboard.apikey);
      params.append('feedback', message);

      return this.http.post(this.baseUrl+`send-feedback`, params, options)
                  .map((response: Response)=>{
                    return response.json();
                  })
    }

}
