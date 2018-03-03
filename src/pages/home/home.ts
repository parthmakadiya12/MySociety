import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';
import { DashboardPage } from "../dashboard/dashboard";
import { SessionManagerProvider } from "../../providers/session-manager/session-manager";
import { RestClientService } from "../../providers/rest-client/rest-client";
import { CSocietyPage } from "../c-society/c-society";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  uid: any;
  idToken: any;
  public data: any = [];
  isLoggedIn: boolean = false;
  constructor(public navCtrl: NavController, public sess: SessionManagerProvider, private toastCtrl: ToastController, private DRapi: RestClientService) {
  }
  login() {
    GooglePlus.login({
      'webClientId': '893288636758-hgt7ts2fgblt6a2cg4c07qq377vc0fme.apps.googleusercontent.com'
    }).then((res) => {
      console.log("Setting Data to setloggedinUser"+JSON.stringify(res));
      this.data = res;
      this.sess.setLoggedInUser(this.data);
      this.displayName = res.displayName;
      this.email = res.email;
      //localStorage.setItem('key', 'value');
      this.familyName = res.familyName;
      this.givenName = res.givenName;
      this.userId = res.userId;
      this.imageUrl = res.imageUrl;
      this.isLoggedIn = true;
      this.uid = res.accessToken;
      this.idToken = res.idToken;
      this.DRapi.post('/inUsers', {
        "uName": this.email, "image": this.imageUrl, "name": this.displayName,
        "idToken": this.idToken, "uid": this.userId
      })
        .subscribe((userResponse) => {
          console.log("USERRESPONSE" + JSON.stringify(userResponse));
          this.DRapi.get('/classes').subscribe((response) => {
            //alert(JSON.stringify(response));
            console.log(response);
            //toast start
            let toast = this.toastCtrl.create({
              message: '- ' + JSON.stringify(response),
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
            
            //toast end
            if(response && (Object.keys(response).length === 0)){
              this.navCtrl.push(CSocietyPage);
            }
            else{
              this.navCtrl.push(DashboardPage);
            }
          });
        });
      
    }, (err) => {
      console.log(err);
    });

  }
  DemoX() {
    //this.navCtrl.push(DashboardPage);
  }
  

  logout() {

    GooglePlus.logout().then(() => {
      console.log("logged out");
      this.displayName = "";
      this.email = "";
      this.familyName = "";
      this.givenName = "";
      this.userId = "";
      this.imageUrl = "";
      this.isLoggedIn = false;
    });

  }

}