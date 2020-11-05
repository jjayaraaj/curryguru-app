import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private _apiUrl = environment.apiUrl;
  private _urlSupporter = `consumer_key=${environment.ck}&consumer_secret=${environment.cs}`;
  private _jsonApiUrl = environment.jsonApiUrl;

  

  constructor(
    private _toastController: ToastController,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController
  ){}

  get urlKey() {
    return this._urlSupporter;
  }

  get apiUrl() {
    return this._apiUrl;
  }

  get jsonApiUrl() {
    return this._jsonApiUrl;
  }

  async presentToast(message, duration:number = 2000) {

    console.log(duration);
    const toast = await this._toastController.create({
      message: message,      
      duration: duration
    });
    toast.present();
  }

  

  async presentLoading(message = 'Please wait...') {
    const loading = await this._loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: message,
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  async presentAlertCtrl(header, message, text) {
    console.log('asd');
    const alert = await this._alertCtrl.create({
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

  dismissLoading() {
    this._loadingCtrl.dismiss();
  }




}
