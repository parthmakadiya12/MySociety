import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GoogleUser } from "../../pages/Model/sign-user";

/*
  Generated class for the SessionManagerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SessionManagerProvider {

  private loggedInUser:GoogleUser;
  constructor() {
  }
  getLoggedInUser():GoogleUser{
    return this.loggedInUser;
  }

  setLoggedInUser(user:GoogleUser){
    this.loggedInUser = user;
  }


}
