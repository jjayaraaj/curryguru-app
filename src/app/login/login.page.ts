import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { CommonService } from '../service/common.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private _authSer: AuthService,
    private _commonSer: CommonService,
    public router: Router,
    public _storage: StorageService
  ) { }

  ngOnInit() {

  }

  signIn() {
    this._commonSer.presentLoading();
    this._authSer.authUser(this.username, this.password).subscribe((res:any) => {
     this._commonSer.dismissLoading();
      if(res.status =='error') {
        this._commonSer.presentAlertCtrl(res.status, res.error, 'ok');
        return;
      }

      this._storage.setObject("userLogginInfo", res).then(() => {
        this._commonSer.dismissLoading();
        this.router.navigate(['/curry-guru/tabs/guru']);
      });

        
     
    }, error=>{
      this._commonSer.dismissLoading();
      console.log(error)
    })
  }

}
