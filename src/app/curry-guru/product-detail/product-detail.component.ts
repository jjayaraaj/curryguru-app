import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {

  @Input() selectedProduct;

  constructor(
    private _modalCtrl: ModalController,
    private _productSer: ProductService
  ) { }

  ngOnInit() {

    console.log(this.selectedProduct);

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

}
