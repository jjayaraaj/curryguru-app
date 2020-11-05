import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductDetailComponent } from '../curry-guru/product-detail/product-detail.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  categoryId: {id: number};
  products: any[] =[];

  constructor(
    private _productSer: ProductService,
    public route: ActivatedRoute,
    private _modalCtrl: ModalController 
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];

    // console.log('categoryid',this.categoryId)

    this._productSer.getProductsByCategory(this.categoryId).subscribe( (data:any) => {
      this.products = data;
    });
  }

  
  async onClickProduct(product) {
    const modal = await this._modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: {selectedProduct: product}, 
      cssClass: 'select-modal'});

    return await modal.present();
  }



}
