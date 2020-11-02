import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 3.5,
  };

 featuredProducts:any = [];
 productCategories:any = [];

  constructor(
    private http: HttpClient,
    private _productSer: ProductService
  ) {  }

  ngOnInit(): void {
    this._productSer.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data;
      console.log(data[0]);
     
    });

    this._productSer.getCategories().subscribe(data => {
      console.log(data)
      this.productCategories = data;
    })

   
  }

}
