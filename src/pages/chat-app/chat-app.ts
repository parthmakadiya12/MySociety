import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionManagerProvider } from "../../providers/session-manager/session-manager";
import { ConversationServiceProvider } from "../../providers/conversation-service/conversation-service";
import { RestClientService } from "../../providers/rest-client/rest-client";
/**
 * Generated class for the ChatAppPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-chat-app',
  templateUrl: 'chat-app.html',
})
export class ChatAppPage {
  ownership: string;
  public picture: any;
  message: any;
  public LoadMsg: any = [];
  public uid: any;
  public textbox: string = "";
  private closeResult: string;
  private emoji: any = [];
  private Emojiname: any;
  public suid: any;
  public isTrue: boolean;
  public cName: string;
  public p2p: any;
  public temp: any;
  public sender: any;
  public receiver: any;
  public chatdatasubscribe: any;
  public conSerGet: any;
  public conSerPost: any;
  public conSerLis: any;
  public focusSettingEventEmitter = new EventEmitter<boolean>();
  public filesToUpload: Array<File>;
  public imageBool: any;
  public class_name_p2p: string;
  public socName:any;
  public owner:any;
  public data:any;
  text: string;

  constructor(public navCtrl: NavController,private DRapi: RestClientService,private conversationService: ConversationServiceProvider, public navParams: NavParams,public sess: SessionManagerProvider,) {
    this.cName=this.navParams.get('society');
    console.log("Class Name nav param"+this.cName);
    this.class_name_p2p=this.cName;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatAppPage');
  }
  ngOnInit(){
    this.getSocietyDetail();
    this.getPersonalDetail();
    this.sender = null;
    this.receiver = null;
    //alert(this.cName);
    this.p2p = null;//check accept or not beta delete it
    this.loaddata();
    this.listenOverSocket();
    this.uid = this.sess.getLoggedInUser().userId;

  }
  getPersonalDetail(){
    this.sender=this.sess.getLoggedInUser.name;
    //this.imageBool=this.sess.getLoggedInUser.image;
  }
  ngAfterViewInit(){
    this.picture=this.sess.getLoggedInUser().image;
    console.log("Picture "+this.picture+" "+this.sess.getLoggedInUser().email);
  }
  getSocietyDetail(){
    this.DRapi.get('/classes').subscribe((ResX) => {
      console.log("getSocietyDeatils...chatapp " + JSON.stringify(ResX));
      console.log("Soc Name at getSociety chatapp"+ResX[0].societyName);
      this.class_name_p2p=ResX[0].societyName;
      this.owner=ResX[0].owner;

    });
  }
  loaddata() {
    //alert("Load data check class" + this.cName);
    //this.classdetail.classname="";
    this.conversationService.getConversations(this.cName, this.sender, this.receiver)//passclasshere{ "CLASSNAME":this.classdetail.classname }
      .subscribe((getresult) => {
        console.log("chat app receive get data "+JSON.stringify(getresult));
        this.LoadMsg = getresult;
        this.text = '';

      });
  }
  listenOverSocket() {
    this.conversationService.listenConversationoverSocket("message").subscribe((data) => {
      console.log('data received over socket');
      this.LoadMsg.push(data);

    })
  }
  chkSendRecieve(serverUID: string) {
    return serverUID == this.uid;
  }
  driveLink(data) {
    //alert(data);
    //this.sendX(true, data);
  }
  sendX(message){
    console.log("UID "+this.sess.getLoggedInUser().userId);
    console.log("sender "+this.sess.getLoggedInUser().displayName);
    console.log(JSON.stringify(this.message));
    console.log(JSON.stringify(this.cName));
    this.imageBool = "";
    if (this.message != "") {
      console.log("Send msg step 1 not null");
      this.conSerPost = this.conversationService.postConversation({
        "conversations": {
          "message": this.message, "type": "text",
          "className": this.cName, "p2p": this.p2p, "name": this.sess.getLoggedInUser().displayName,"imageBool": this.imageBool,"userId":this.uid
        }
      }).subscribe((postResult) => {
        //this.LoadMsg += this.message;//raise trying to diff data error.
        this.loaddata();
        this.message = "";
      });
    }
    else {
      console.log("Message was empty so..");
    }
  }
/*
  send(bool?, durl?) {
    this.message={"ownership":"mine"};
    console.log("At sending DATA classname"+JSON.stringify(this.cName));
    console.log("At sending DATA message"+JSON.stringify(this.message));    
    this.imageBool = "";
    if (bool) {
      this.message = durl;
      console.log("Drive url", this.message);
      this.imageBool = "driveurl";
    }
    if (this.message != "") {
      console.log("Send msg step 1 not null");
      this.conSerPost = this.conversationService.postConversation({
        "conversations": {
          "message": this.message, "type": "text",
          "className": this.cName, "mType": "Global", "p2p": this.p2p, "sender": this.sender, "receiver": this.receiver,
          "imageBool": this.imageBool
        }
      }).subscribe((postResult) => {
        //this.LoadMsg += this.message;//raise trying to diff data error.
        this.loaddata();
        this.message = "";
      });
    }
    else {
      console.log("Message was empty so..");
    }
  }
  */
}
