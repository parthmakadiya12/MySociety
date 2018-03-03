import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { SessionManagerProvider } from "../../providers/session-manager/session-manager";
import { RestClientService } from "../../providers/rest-client/rest-client";
import { GooglePlus } from 'ionic-native';
import { HomePage } from "../home/home";
import { CSocietyPage } from "../c-society/c-society";
import { MRequestPage } from "../m-request/m-request";
import { Observable } from 'rxjs/Rx';
import { ChatAppPage } from "../chat-app/chat-app";
/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  accessTokenX: any;
  displayNameX: any;
  idTokenX: any;
  buttonColor: any;
  buttonColor1: any;
  category: string = "Profile";
  Tabs: any = ["Profile", "Dashboard", "About"];
  swipe: any = 1;
  SocietyX: any;
  public data: any;
  public edited = false;
  public items: any = ["Fill Water Tank", "Chat", "Create Poll", "Emergency", "Show Members", "Vote", "See Log"];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DRapi: RestClientService, public alertCtrl: AlertController, public sess: SessionManagerProvider, private toastCtrl: ToastController) {
  }
  ngOnInit() {
    this.myOwnedClass();
  }
  swipeEvent(e) {
    console.log(e.direction);
    //var xx=parseInt(this.Tabs.findIndex(x => x == e))
    //this.category="Dashboard";//this.Tabs[xx+1];
    if (this.category == "Profile" && e.direction == 4) {
      this.category = "Dashboard";
    }
    else if (this.category == "Dashboard" && e.direction == 4) {
      this.category = "About";
    }
    else if (this.category == "About" && e.direction == 4) {
      this.category = "Profile";
    }
    if (this.category == "Profile" && e.direction == 2) {
      this.category = "About";
    }
    else if (this.category == "Dashboard" && e.direction == 2) {
      this.category = "Profile";
    }
    else if (this.category == "About" && e.direction == 2) {
      this.category = "Dashboard";
    }
    this.category = this.Tabs.next();
    // let toastX = this.toastCtrl.create({
    //   message: ' Swipped ' + JSON.stringify(e),
    //   duration: 3000,
    //   position: 'top'
    // });
    // toastX.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    // this.swipe++;
    // toastX.present();
  }
  saveTodos(): void {
    //show box msg
    this.edited = true;
    //wait 3 Seconds and hide
    setTimeout(function () {
      this.edited = false;
      console.log(this.edited);
    }.bind(this), 3000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.xx();
    this.data = this.sess.getLoggedInUser();
    this.displayName = this.data.displayName;
    this.email = this.data.email;
    this.familyName = this.data.familyName;
    this.givenName = this.data.givenName;
    this.userId = this.data.userId;
    this.imageUrl = this.data.imageUrl;
    this.idTokenX = this.data.idToken;
    this.accessTokenX = this.data.accessToken;
    this.DRapi.get('/classes').subscribe((response) => {
      this.SocietyX = response[0].societyName;
      console.log("Name soci " + this.SocietyX);
      //name=[rapidata.];
    })
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
      this.navCtrl.push(HomePage);
    });
  }
  xx() {
    Observable.interval(200 * 60).subscribe(x => {
      console.log("xx called");
      this.filltankget();
      this.emergencyget();
    });
  }

  fillTank() {

    this.DRapi.post('/Emergency/fillTank', { "socData": { "societyName": this.SocietyX, "uid": this.sess.getLoggedInUser().userId } }).subscribe((ResX) => {
      console.log("USERRESPONSE post filltank" + JSON.stringify(ResX));
    });
  }
  TankFilled(){
    this.DRapi.postX('/Emergency/remove', {"type":"FullTank","uid":this.sess.getLoggedInUser().userId}, this.SocietyX)
    .subscribe((userResponse) => {
      console.log(JSON.stringify("insde emergency inside / emer "+userResponse));
    });
  }
  filltankget() {
    this.buttonColor1 = '#345465';
    console.log("fill tank");
    this.DRapi.getX('/Emergency/fillt', this.SocietyX).subscribe((response) => {
      console.log("USERRESPONSE get filltank" + JSON.stringify(response));
      if(response[0].uid==null){
        this.buttonColor1='#000000';
      }
    })
  }
  Emergency() {
    this.DRapi.post('/Emergency', { "socData": { "societyName": this.SocietyX, "uid": this.sess.getLoggedInUser().userId } }).subscribe((ResX) => {
      console.log("USERRESPONSE post emer" + JSON.stringify(ResX));

    });
  }
  emergencyget() {
    this.buttonColor = '#345465';
    console.log("emergency tank");
    this.DRapi.getX('/Emergency/emer', this.SocietyX).subscribe((response) => {
      console.log("USERRESPONSE get emer" + JSON.stringify(response));
      if(response!=null){// response.societyName!=0
        this.presentAlert("Emergency Needed"," "+response[0].societyName+" UID "+response[0].uid);
        this.DRapi.postX('/Emergency/remove', {"type":"Emergency","uid": response[0].uid }, this.SocietyX)
        .subscribe((userResponse) => {
          console.log(JSON.stringify("insde emergency inside / emer "+userResponse));
        });
      }
      if(response==[]){
        this.buttonColor='#000000';
      }
    })
  }
  society() {
    this.navCtrl.push(CSocietyPage);
  }
  itemSelected(abc: any) {
    // let toast = this.toastCtrl.create({
    //   message: '- ' + abc,
    //   duration: 3000,
    //   position: 'top'
    // });
    // toast.onDidDismiss(() => {
    //   console.log('Dismissed toast');
    // });
    // toast.present();

  }
  Requests() {
    this.navCtrl.push(MRequestPage);
  }
  presentAlert(title,subtitle) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle
    });
    alert.present();
  }
  Accept(cname: string, ud: string) {
    //alert(ud);
    this.DRapi.postX('/requestC/accs', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        //alert(JSON.stringify(userResponse));
        console.log('Accept' + JSON.stringify(userResponse));
      });
  }
  Reject(cname: string, ud: string) {
    //alert(ud);
    this.DRapi.postX('/requestC/reject', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        console.log('Reject' + JSON.stringify(userResponse));
      });
  }
  openChat(society?) {
    this.navCtrl.push(ChatAppPage, { "society": society });
  }
  //Demo this 5 lines
  public DRapidata: any;
  public owns: any;
  myOwnedClass() {
    this.DRapi.get('/inUsers').subscribe((response) => {
      //this will print all class that user own...
      console.log("/inUsers from here myOwnClass", response);
      this.DRapidata = response;
      this.owns = response;
      // let toast = this.toastCtrl.create({
      //   message: '-Rapidata ' + this.DRapidata,
      //   duration: 3000,
      //   position: 'top'
      // });
      // toast.onDidDismiss(() => {
      //   console.log('Dismissed toast');
      // });
      // toast.present();
      //name=[rapidata.];
    })
  }
}
