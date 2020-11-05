import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
    providedIn: 'root'
  })

export class CustomerService {

    private _email = new Subject<boolean>();

    get emailIsAvailable () {
        return this._email.asObservable();
    }

    constructor(
        private _commonSer : CommonService,
        private _http: HttpClient
    ) {}

    checkCustomerEmailAvailable(emailid) {
        this._http.get(`${this._commonSer.apiUrl}customers?email=${emailid}&${this._commonSer.urlKey}`).subscribe( (data: any) => {
            if(data.length == 0) {
                // console.log('false');
                this._email.next(false);
            }else {
                // console.log('true');
                this._email.next(true);
            }
        
        })
    }


    postNewCustomer( postData) {
        return this._http.post(`${this._commonSer.apiUrl}customers?${this._commonSer.urlKey}`, postData);
    }
}