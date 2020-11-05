import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-curry-guru',
  templateUrl: './curry-guru.page.html',
  styleUrls: ['./curry-guru.page.scss'],
})
export class CurryGuruPage implements OnInit {

  cartCount$: Observable<number>;

  constructor(
    private _productSer: ProductService
  ) { }

  ngOnInit() {
    this._productSer.cartCount();
    this.cartCount$ = this._productSer.getCartCount();
  }

}
