import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestClientService } from "../../providers/rest-client/rest-client";
import { SessionManagerProvider } from "../../providers/session-manager/session-manager";
import { DashboardPage } from "../dashboard/dashboard";
import { ChatAppPage } from "../chat-app/chat-app";
/**
 * Generated class for the CSocietyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-c-society',
  templateUrl: 'c-society.html',
})
export class CSocietyPage {
  public sName;
  public data:any;
  public socName="SNNNS";
  public socities:any=[];
  public ownerX:any;
  public owneridX:any;
  constructor(public navCtrl: NavController,public sess: SessionManagerProvider,public navParams: NavParams,private DRapi: RestClientService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CSocietyPage');
    this.data=this.sess.getLoggedInUser();
    this.getSocietyDetail();
  } 
  ngAfterViewInit(){
    this.data=this.sess.getLoggedInUser();
    this.getSocietyDetail();
  }
  createSociety(sName){
    console.log("Society Name "+sName);
    console.log("AT Create Society "+JSON.stringify(this.sess.getLoggedInUser()));
    var owner=[];
    var member=[];
    owner.push(this.sess.getLoggedInUser().uid);
    member.push(this.sess.getLoggedInUser().uid);
    this.DRapi.post('/classes',{"SocData": {"societyName":sName ,"owner":owner,"uid":this.sess.getLoggedInUser().userId,"member":member}}).subscribe((ResX) => {
        console.log("USERRESPONSE" + JSON.stringify(ResX));
        this.navCtrl.push(DashboardPage);
      });

      
  }
  getSocietyDetail(){
    this.DRapi.get('/classes').subscribe((ResX) => {
      console.log("getSocietyDeatils... " + JSON.stringify(ResX));
      console.log("Soc Name at getSociety"+ResX[0].societyName);
      this.socName=ResX[0].societyName;
      this.ownerX=ResX[0].owner;
      this.owneridX=ResX[0].uid;
      this.socities=ResX;
      console.log("all societies "+JSON.stringify(this.socities));
    });
  }
  openChat(society?){
    this.JoinSociety(society);
    this.navCtrl.push(ChatAppPage,{"society":society});
  }

  JoinSociety(snameX){
    this.DRapi.postClass("poP").subscribe((response) => {
      console.log("Get class Data from class-detail", response);
      this.owneridX = response[0].owner;
      console.log(response);      
    });
    console.log("AT Create Society "+JSON.stringify(this.sess.getLoggedInUser()));
    console.log("Society name at Join SOciety "+snameX+" owner id "+this.ownerX[0].toString+" owneruid "+this.owneridX);
    this.DRapi.postX('/requestC', { "name": this.data.name, "uid": this.data.userId, "societyName": snameX,
     "ownerid": this.ownerX[0],"owneruid":this.owneridX },snameX)
    .subscribe((userResponse) => {
      //alert(JSON.stringify(userResponse));
      console.log("response join society... " + JSON.stringify(userResponse));
      //this.navCtrl.push(DashboardPage);
    });
    
  }
}
