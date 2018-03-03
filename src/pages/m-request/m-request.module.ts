import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MRequestPage } from './m-request';
import { RestClientService } from "../../providers/rest-client/rest-client";

@NgModule({
  declarations: [
    MRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(MRequestPage),
  ],
})
export class MRequestPageModule {
  u_data: any;
  constructor(private DRapi: RestClientService) { }

  requestC() {
    //this will get all request made to relative class to get membership..
    this.DRapi.get('/requestC').subscribe((response) => {
      console.log("RequestC class", response);
      this.u_data = response;
      console.log("u_data" + JSON.stringify(response));

    })
  }

  Accept(cname: string, ud: string) {
    //alert(ud);
    this.DRapi.postX('/requestC/accs', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        console.log("Data at Accept"+userResponse);
      });
  }
  Reject(cname: string, ud: string) {
    //alert(ud);
    this.DRapi.postX('/requestC/reject', { "uid": ud }, cname)
      .subscribe((userResponse) => {
        console.log("Data at Accept"+userResponse);
      });
  }

}
