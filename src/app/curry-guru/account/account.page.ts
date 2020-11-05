import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CommonService } from 'src/app/service/common.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedIn: boolean = false;
  user:any = '';
  username: string = '';
  password: string = '';
  returnPage;

  constructor(
    private _authSer: AuthService,
    private _commonSer: CommonService,
    public router: Router,
    public _storage: StorageService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((param:Params) => {
      console.log(param.next);
      this.returnPage = param.next;
    })

    this.checkLogin();
  }

  ionViewDidEnter() {
   this.checkLogin();
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
        if(this.returnPage) {
          this.router.navigate(['/checkout']);
        }else{
          this.router.navigate(['/curry-guru/tabs/account']);
        }
        
      });

        
     
    }, error=>{
      this._commonSer.dismissLoading();
      console.log(error)
    })
  }

  checkLogin() {
    this._storage.getObject('userLogginInfo').then((userLogginInfo: any) => {
      if(userLogginInfo != null) {
        
        this.user = userLogginInfo.user;
        console.log(this.user);
        this.loggedIn = true;
      }else {
        this.user = '';
        this.loggedIn = false;
      }
    });
  }

  onClickLogout() {
    this._storage.removeItem('userLogginInfo').then(()=>{
      console.log("deleted");
      this.loggedIn = false;
    });
  }

}
