import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CommonService } from '../service/common.service';
import { CustomerService } from '../service/customer.service';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  newUser: any = {};
  countries: any[] = [];
  states: any[] = [];
  selectedCountry;
  billing_shipping_same = false;
  $emailAvailable :Observable<boolean>;

  @ViewChild('email', {static: false}) emailInput: { setFocus: () => void; };



  constructor(
    private _productSer: ProductService,
    private _cutomerSer: CustomerService,
    private _commonSer: CommonService,
    public alertController: AlertController
  ) { }

  ngOnInit() {

    this.newUser.billing_address = {};
    this.newUser.shipping_address = {};

   this._productSer.getCountryList().subscribe((data:any) => {
    this.countries = data.countries;
    // console.log(this.countries);
   });
  }

  onSelectCountry(event) {
    console.log("asd",event.detail.value);
    const country = event.detail.value;

    const sta = this.countries.filter( f=> f.country == country);
    this.states = sta[0].states;
  }

  setBillingtoSHipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if(this.billing_shipping_same) {
      this.newUser.billing = this.newUser.shipping;
    }
  }

  signUp(): void{

    this._commonSer.presentLoading();
   
      let customerData = {
       
          "email": this.newUser.email,
          "first_name": this.newUser.first_name,
          "last_name": this.newUser.last_name,
          "username": this.newUser.username,
          "password": this.newUser.password,
          "billing":{
            "first_name": this.newUser.first_name,
            "last_name": this.newUser.last_name,
            "company": '',
            "address_1": this.newUser.address_1,
            "address_2": this.newUser.address_2,
            "city": this.newUser.city,
            "state": this.newUser.state,
            "postcode": this.newUser.billing_address.postcode,
            "country": this.newUser.country,
            "email": this.newUser.email,
            "phone": this.newUser.billing_address.phone
          },
          "shipping":{
            "first_name": this.newUser.first_name,
            "last_name": this.newUser.last_name,
            "company": '',
            "address_1": this.newUser.address_1,
            "address_2": this.newUser.address_2,
            "city": this.newUser.city,
            "state": this.newUser.state,
            "postcode": this.newUser.shipping_address.postcode,
            "country": this.newUser.country,
            "email": this.newUser.email,
            "phone": this.newUser.shipping_address.phone
          }
        
      };

      if(this.billing_shipping_same) {
        this.newUser.billing = this.newUser.shipping;
      }

      this._cutomerSer.postNewCustomer(customerData).subscribe( (response:any)=> {
        this._commonSer.dismissLoading();
        if(response) {
          this.presentAlertCtrl('Account Created', 'Your Account has been created successfully! Please login to proceed', 'Login');
        }
        console.log(response);
      }, error=> {
        this._commonSer.dismissLoading();
        let errorCode;
        if(error.error.code ='rest_missing_callback_param') {
          errorCode = "Someting went wrong in server! Please try again later";
        } else {
          errorCode = "Error in creating account! Please try again later";
        }
        
        this.presentAlertCtrl('Error', errorCode, 'ok');
      });
  }

  checkEmail() {
   

    let validEmail = false;
    let email = this.newUser.email;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(reg.test(email)){
      //email looks valid
      this._cutomerSer.checkCustomerEmailAvailable(email);
      this.$emailAvailable = this._cutomerSer.emailIsAvailable;

      this.$emailAvailable.subscribe( response => {
        if(response == true){
          this._commonSer.presentToast('Email already registered. Please check.', 5000);
          this.newUser.email = '';
          this.emailInput.setFocus();
        }
      })
    }else {
      this._commonSer.presentToast('Invalid email. Please check.', 5000);
      this.newUser.email = '';
      this.emailInput.setFocus();
    }
  }

  async presentAlertCtrl(header, message, text) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      // subHeader: 'Subtitle',
      message: message,
      buttons: [{
        text: text, 
        handler: ()=>{}
      }]
    });

    await alert.present();
  }



}
