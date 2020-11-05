import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../../service/product.service';
import { Plugins } from '@capacitor/core';
import { StorageService } from '../../service/storage.service';
import { CommonService } from 'src/app/service/common.service';

const { Storage } = Plugins;


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct;
  cartData = [];

  constructor(
    private _modalCtrl: ModalController,
    private _productSer: ProductService,
    private _storage: StorageService,
    private _commonSer: CommonService
  ) { }

  ngOnInit() {

    // console.log(this.selectedProduct);

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this._modalCtrl.dismiss({
      'dismissed': true
    });
  }

  relatedProducts(id): void {
    //this._productSer.getProductsById(id)
  }

  onClickAdd(product) {
    this._storage.getObject('cart').then((data: any)=> {

      if(data == null || data.length == 0) {
        
        data = [];

        data.push({
          "product": product,
          "qty": 1,
          "amount": parseFloat(product.price)
        });

        this._productSer.addItemInCart(product);

      } else {

        let added = 0;

        for(let i = 0; i < data.length; i++) {

          if(product.id == data[i].product.id){ 
            let qty = data[i].qty;
            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
            console.log("Product has already been added");
          }

        }

        if(added == 0) {
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });
          console.log("to be added", data)
          this._productSer.addItemInCart(data);
        }

      }

      this._storage.setObject('cart', data).then(()=> {
        console.log("cart added successfukly");
       //this._commonSer.presentToast('Product has been succeffully added to cart')
      });
     
    });
  }




}
