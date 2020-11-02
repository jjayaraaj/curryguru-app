import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurryGuruPageRoutingModule } from './curry-guru-routing.module';

import { CurryGuruPage } from './curry-guru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurryGuruPageRoutingModule
  ],
  declarations: [CurryGuruPage]
})
export class CurryGuruPageModule {}
