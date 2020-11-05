import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/service/product.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchQuery: string="";
  products: any = [];

  constructor(
    private _productSer: ProductService,
    private _modalCtrl: ModalController,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {

    // this.route.queryParams.subscribe(params => {
    //   console.log(params.searchParams);
    //   if(params.searchParams !=='') {
    //     this.searchQuery = params.searchParams;
    //     this.searchProducts();
    //   } 
    // })

  }

  onSearch(event) {
    
      
      this.searchProducts();
    console.log(this.searchQuery);
 

 
  
  }


  async onClickProduct(product) {
    const modal = await this._modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: {selectedProduct: product}, 
      cssClass: 'select-modal'});

    return await modal.present();
  }

  searchProducts(): void {
    this._productSer.getProductsBySearch(this.searchQuery).subscribe((data)=> {      
      this.products = data;
    });
  }


}
