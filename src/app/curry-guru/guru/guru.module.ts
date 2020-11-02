import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuruPageRoutingModule } from './guru-routing.module';

import { GuruPage } from './guru.page';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuruPageRoutingModule
  ],
  declarations: [GuruPage, ProductDetailComponent],
  entryComponents: [ProductDetailComponent]
})
export class GuruPageModule {}
