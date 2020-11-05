import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommonService } from './common.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 private _cartCount = new Subject<number>();
  cartItems: any[] = [];

  constructor(
    private _http: HttpClient,
    private _commonSer: CommonService,
    private _storage: StorageService
  ) {

   
   }

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

  getProductsByCategory(categoryId) {
    return this._http.get(`${this._commonSer.apiUrl}products/?category=${categoryId}&${this._commonSer.urlKey}`);
  }

  getProductsBySearch(searchParams) {
    return this._http.get(`${this._commonSer.apiUrl}products?search=${searchParams}&${this._commonSer.urlKey}`);
  }

  getCartCount() {
    return this._cartCount.asObservable();
  }

  cartCount() {
    this._storage.getObject('cart').then( (data:any) => {
      this.cartItems = data;
      console.log(this.cartItems.length);
      this._cartCount.next(this.cartItems.length);
    });

  }

  removeItemInCart(removed: boolean, item): void{

    console.log(item);

    this._storage.getObject('cart').then((data: any)=> {
      if(data == null || data.length == 0) {
        this._cartCount.next(0);
      }
    });

    if(removed) {

      // const removeItem = this.cartItems.filter( f=> f.id == item.product.id);
      const removeItem = this.cartItems.findIndex( f =>  f.product.id === item.product.id);
      
      if(removeItem) {
        console.log("no more items");
      }
      this.cartItems.splice(removeItem,  1);

      this._cartCount.next(this.cartItems.length);

    }
  }

  addItemInCart(product) {
    console.log(product);
    this.cartItems = product;
    this._cartCount.next(this.cartItems.length);
    console.log(this.cartItems);
  }

  getCountryList() {
  return this._http.get("assets/country.json")
  }

  


}
