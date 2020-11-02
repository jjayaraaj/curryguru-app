import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private _http: HttpClient,
    private _commonSer: CommonService
  ) { }

  getFeaturedProducts() {
  return  this._http.get(`${this._commonSer.apiUrl}products?featured=true&${this._commonSer.urlKey}`);
  }

  getCategories() {
    return this._http.get(`${this._commonSer.apiUrl}products/categories?${this._commonSer.urlKey}`)
  }

  getProducts() {
    return this._http.get(`${this._commonSer.apiUrl}products?per_page=30&page=1&${this._commonSer.urlKey}`)
  }

  getProductsById(id) {
    return this._http.get(`${this._commonSer.apiUrl}products/id?${this._commonSer.urlKey}`);
  }


}
