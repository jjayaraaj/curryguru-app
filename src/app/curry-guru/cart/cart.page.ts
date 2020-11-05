import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { ProductService } from 'src/app/service/product.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cartItems: any[] = [];
  total: any;
  showEmptyCartMessage: boolean =  false;

  constructor(
    private _storage: StorageService,
    private _commonSer: CommonService,
    private _productSer: ProductService,
    public router: Router
  ) { }

  ngOnInit() {
    

  }

  ionViewWillEnter (): void {
    this.total = 0.0;
    this._storage.getObject('cart').then((data:any)=> {
      this.cartItems = data;
      console.log(data);

      if(this.cartItems.length > 0) {

        this.cartItems.forEach((item, index) => {
          this.total = this.total + (item.product.price * item.qty);
        });
      } else {
        this.showEmptyCartMessage =true;
      }

    });
  }

  

  removeItem(item, index) {

    

    let price = item.product.price;
    let qty = item.qty;
    let removed: boolean = false;

    console.log('b4', removed );
    this.cartItems.splice(index , 1);
    removed = true;
    this._storage.setObject("cart", this.cartItems).then((data) => {
      this.total = this.total - (price * qty);
    });
    
   

    if(this.cartItems.length == 0) {
      removed = false;
      this.showEmptyCartMessage = true;
    }

    this._productSer.removeItemInCart(removed, item);
    
  }


  changeQty(item, index, change) {
    let price = 0;
    let qty = 0;

    price = parseFloat(item.product.price);
    qty = item.qty;

    if(change < 0 && item.qty == 1) {
      return;
    }

    qty = qty + change;
    item.qty = qty;
    item.amount = qty * price;

    this.cartItems[index] = item;
    this._storage.setObject("cart", this.cartItems).then(() => {
      this._commonSer.presentToast('Cart Updated')
    });
  }

  checkout() {
    this._storage.getObject('userLogginInfo').then((data: any)=>{
      if(data != null) {
        this.router.navigate(['/checkout']);
      }else {
        this.router.navigate(['/curry-guru/tabs/account'], { queryParams: { next: 'checkout' } })
      }
    });    
  }

}
