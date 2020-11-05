import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
  })

export class AuthService {
    constructor(
        private _commonSer: CommonService,
        private _http: HttpClient
    ) {}

    authUser(username, password){
        return  this._http.get(`https://www.curryguruhawaii.com/api/auth/generate_auth_cookie/?username=${username}&password=${password}`);
    }
}