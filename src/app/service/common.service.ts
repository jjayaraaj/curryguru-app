import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _apiUrl = environment.apiUrl;
  private _urlSupporter = `consumer_key=${environment.ck}&consumer_secret=${environment.cs}`;

  get urlKey() {
    return this._urlSupporter;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  constructor() { }
}
