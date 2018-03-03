import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestClientService } from "../../providers/rest-client/rest-client";

/**
 * Generated class for the MRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-m-request',
  templateUrl: 'm-request.html',
})
export class MRequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private DRapi: RestClientService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MRequestPage');
  }
  ngOnInit() {
    this.requestC();
  }
  u_data: any;

  requestC() {
    //this will get all request made to relative class to get membership..
    this.DRapi.get('/requestC').subscribe((response) => {
      console.log("RequestC class", response);
      this.u_data = response;
      console.log("u_data" + JSON.stringify(response));
    })
  }
  Accept(cname: string, ud: string) {
    console.log("cname"+cname+" uid "+ud);
    this.DRapi.postX('/requestC/accs', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        console.log(JSON.stringify(userResponse));
        
      });
  }
  Reject(cname: string, ud: string) {
    console.log("cname"+cname+" uid "+ud);
    this.DRapi.postX('/requestC/reject', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        console.log(JSON.stringify(userResponse));
      });
    
  }

}
