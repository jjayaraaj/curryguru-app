import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurryGuruPage } from './curry-guru.page';

const routes: Routes = [
  
  {
    path: 'tabs',
    component: CurryGuruPage,
    children: [
      {
        path:'guru', children: [
          {
            path: '',
            loadChildren: './guru/guru.module#GuruPageModule'
          },
          {
            path: ':poductId',
            loadChildren: './guru/product-detail/product-detail.module#ProductDetailPageModule'
          }
        ]
      },

      {
        path: 'search',
        loadChildren: './search/search.module#SearchPageModule'
      },
      {
        path: 'cart',
        loadChildren: './cart/cart.module#CartPageModule'
      },

      {
        path: 'account',
        loadChildren: './account/account.module#AccountPageModule'
      },
      {
        path: '',
        redirectTo: '/curry-guru/tabs/guru',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/curry-guru/tabs/guru',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurryGuruPageRoutingModule {}
