import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-guru',
  templateUrl: './guru.page.html',
  styleUrls: ['./guru.page.scss'],
})
export class GuruPage implements OnInit {
  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: -60,
  };

  categories = {
    slidesPerView: 3.5,
    spaceBetween: -10,
  };

 featuredProducts:any = [];
 productCategories:any = [];
 products:any = [];
 searchQuery: string="";


  constructor(
    private _productSer: ProductService,
    private _modalCtrl: ModalController,
    public router: Router

  ) { 
    

  }

  ngOnInit() {
    this._productSer.getFeaturedProducts().subscribe(data => {
      this.featuredProducts = data;
      console.log(data[0]);
     
    });

    this._productSer.getCategories().subscribe(data => {
      console.log(data)
      this.productCategories = data;
    });

    this._productSer.getProducts().subscribe(data => {
      console.log(data[0].categories[0].name);
      this.products = data;
    })
  }

  async onClickProduct(product) {
    const modal = await this._modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: {selectedProduct: product}, 
      cssClass: 'select-modal'});

    return await modal.present();
  }

  onSearch(event) {
    this.router.navigate(['curry-guru/tabs/search'], { queryParams: { searchParams: this.searchQuery } });
  }

  onClickCategory(category) {
    this.router.navigate(['product-list', category.id ]);
  }



}
