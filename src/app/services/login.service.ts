import { Injectable } from '@angular/core';
import { Router , CanActivate , RouterStateSnapshot , ActivatedRoute} from '@angular/router'
import { Http , Response , Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class LoginService{
    constructor(public http : Http){
    }
    baseUrl = 'http://demo.hackerkernel.com/prodigee-test/';
    loggingIn(mobile , password){
        let headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        let option = new RequestOptions({headers : headers});
        let params = new URLSearchParams();
        params.append('mobile' , mobile);
        params.append('password' , password);
        let body = params.toString();
        return this.http.post(this.baseUrl+"student-login" , body , option)
        .map((response: Response)=>{
            return response.json();
        })
    }

    forgotPassword(mobile){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        let options = new RequestOptions({
            headers : header
        })
        let params = new URLSearchParams();
        params.append('mobile' , mobile);
        let body = params.toString();
        return this.http.post(this.baseUrl+"send-otp" , body , options).map(
            (response)=>{
                return response.json();
            }
        )
    }

    checkOtp(mobile , otp){
        let header = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        let options = new RequestOptions({
            headers : header
        })
        let params = new URLSearchParams();
        params.append('mobile' , mobile);
        params.append('otp' , otp);
        let body = params.toString();
        return this.http.post(this.baseUrl+"check-otp" , body , options).map(
            (response)=>{
                return response.json();
            }
        )
    }
}