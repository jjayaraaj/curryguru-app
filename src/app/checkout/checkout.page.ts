import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  newOrder: any = {};
  paymentMethods: any[];
  paymentMethod:any;
  billing_shipping_same: boolean = false;
  countries: any[] = [];
  states: any[] = [];
  selectedCountry;
  userInfo:any;

  constructor(
    private _storage: StorageService
  ) { }

  ngOnInit() {

    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};

    this.paymentMethods = [
      {payment_method: "bacs", payment_method_title: "Direct Bank Transfer"  },
      {payment_method: "cod", payment_method_title: "Cash On Delivery"  },
      {payment_method: "stripe", payment_method_title: "Credit / Debit Card"  }
      
    ];

    this._storage.getObject('userLogginInfo').then((userLogginInfo:any) => {
      this.userInfo = userLogginInfo;

      let email = userLogginInfo.user.email;

      
    });
  }

  setBillingtoSHipping() {
    this.billing_shipping_same = !this.billing_shipping_same;
    if(this.billing_shipping_same) {
      this.newOrder.billing = this.newOrder.shipping;
    }
  }

  order() {

  }

  onSelectCountry(event) {
    console.log("asd",event.detail.value);
    const country = event.detail.value;

    const sta = this.countries.filter( f=> f.country == country);
    this.states = sta[0].states;
  }

}
