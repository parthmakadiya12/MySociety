import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { RestClientService } from "../rest-client/rest-client";
import { Observable } from "rxjs/Observable";
import * as io from 'node_modules/../socket.io-client';
import { RequestOptions, URLSearchParams } from "@angular/http";

/*
  Generated class for the ConversationServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ConversationServiceProvider {
  private url = "http://192.168.43.139:5000";//13.71.120.165
  private socket = io(this.url);
  constructor(private restClientService: RestClientService) { }
  postConversation(conversation): Observable<any> {
    console.log("post conversation at service" + JSON.stringify(conversation));
    return this.restClientService.post('/conversations', conversation);
  }
  getConversations(cname: any, sender?: any, receiver?: any): Observable<any> {
    console.log("At conversation Service cNAME"+cname+"  "+sender);
    let params: URLSearchParams = new URLSearchParams();
    params.set('CLASSNAME', cname);
    if (sender != null) {
      params.set('SENDER', sender);
      params.set('RECEIVER', receiver);
      console.log("P2P get request Here adding sender and receiver conver service" + sender + " " + receiver);
    }
    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.restClientService.get('/conversations', params);
  }
  listenConversationoverSocket(message): Observable<any> {
    let observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on(message, (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }
}
