import { Injectable } from '@angular/core';
import { Http,RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import { Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Headers } from '@angular/http';
import { SessionManagerProvider } from "../../providers/session-manager/session-manager";

@Injectable()
export class RestClientService {
  url = 'http://192.168.43.139:5000';//13.71.120.165
  constructor(private http: Http, private sess: SessionManagerProvider) { }
  public get(apipath,params?): Observable<any> {   
    let header = new Headers();
    this.addAuthHeader(header);
    console.log("Params at get Restclient Service"+params);
    return this.http.get(this.url + apipath, { headers: header , params:params }).map((response: Response) => response.json());
  }
   public getX(apipath,cn): Observable<any> {
    let header = new Headers();
       this.aH(header,cn);
       //alert("get x rapi"+cn);
    return this.http.get(this.url + apipath, { headers: header }).map((response: Response) => response.json());
  }
  public aH(header: Headers,cn) {
    header.append("authorization", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlMzYwOGZmOWQ0MDAwYThmYWNmMDYxMmNlOWFmYTVjN2I1MjczNjgifQ.eyJhenAiOiIxMDU0NTgxNDM3NzUwLTFiYmc1ZWdvMGQ1NjhobmZsbWRuMGllbTZmbGFxcmtkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA1NDU4MTQzNzc1MC0xYmJnNWVnbzBkNTY4aG5mbG1kbjBpZW02ZmxhcXJrZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDMwNzE3OTY1OTI5NjQzNDQ4NyIsImVtYWlsIjoiY2hhbHN4ZXZpb3JAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ0b2RIWmxnUFhXUDNtU2Q3ZWNERF9BIiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTQ5ODAzMzM2MiwiZXhwIjoxNDk4MDM2OTYyLCJuYW1lIjoiQ2hhbHMgWGV2aW9yIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tTFZ0M05DY3AyUk0vQUFBQUFBQUFBQUkvQUFBQUFBQUFBQkUvb1N6bkNoYlZFYm8vczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkNoYWxzIiwiZmFtaWx5X25hbWUiOiJYZXZpb3IiLCJsb2NhbGUiOiJlbiJ9.aAaFUt2p9uyr-cM9dF4GcmzFy4jYIZ_q21waG1rULVoAl-s7O5xjgzrDcC4ne649sEZPzyk6IGyMXoDddjSM8qohr7VNKUC6DqoBE8stXsRiQGn1fxDDfeLyHSM0kkUWik9LClvoAJzvt_mQcO_xhTwD41v0I_OlLQQoPWLfWwCjvTGyaoR3hnO1miOVdCcfzjarR6v0bNGv5K42sgHJe3y5lKbhJysrudO8_UPIGhdl4S5txnnCiok7w7VtR72d0MklHTtYyyHTCg8s6apVuPJuBxT3rxwYsrQElBK0FvRZ2_E5cBYqOI0snrhYnSFauJ_UliwMqhtRknK1-MQF8A");
    console.log("Header value at Rest API"+this.sess.getLoggedInUser().userId);
    header.append("uid", this.sess.getLoggedInUser().userId);
    header.append("classH",cn);
  }

  public addAuthHeader(header: Headers) {
    header.append("authorization", "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlMzYwOGZmOWQ0MDAwYThmYWNmMDYxMmNlOWFmYTVjN2I1MjczNjgifQ.eyJhenAiOiIxMDU0NTgxNDM3NzUwLTFiYmc1ZWdvMGQ1NjhobmZsbWRuMGllbTZmbGFxcmtkLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTA1NDU4MTQzNzc1MC0xYmJnNWVnbzBkNTY4aG5mbG1kbjBpZW02ZmxhcXJrZC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDMwNzE3OTY1OTI5NjQzNDQ4NyIsImVtYWlsIjoiY2hhbHN4ZXZpb3JAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ0b2RIWmxnUFhXUDNtU2Q3ZWNERF9BIiwiaXNzIjoiYWNjb3VudHMuZ29vZ2xlLmNvbSIsImlhdCI6MTQ5ODAzMzM2MiwiZXhwIjoxNDk4MDM2OTYyLCJuYW1lIjoiQ2hhbHMgWGV2aW9yIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tTFZ0M05DY3AyUk0vQUFBQUFBQUFBQUkvQUFBQUFBQUFBQkUvb1N6bkNoYlZFYm8vczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkNoYWxzIiwiZmFtaWx5X25hbWUiOiJYZXZpb3IiLCJsb2NhbGUiOiJlbiJ9.aAaFUt2p9uyr-cM9dF4GcmzFy4jYIZ_q21waG1rULVoAl-s7O5xjgzrDcC4ne649sEZPzyk6IGyMXoDddjSM8qohr7VNKUC6DqoBE8stXsRiQGn1fxDDfeLyHSM0kkUWik9LClvoAJzvt_mQcO_xhTwD41v0I_OlLQQoPWLfWwCjvTGyaoR3hnO1miOVdCcfzjarR6v0bNGv5K42sgHJe3y5lKbhJysrudO8_UPIGhdl4S5txnnCiok7w7VtR72d0MklHTtYyyHTCg8s6apVuPJuBxT3rxwYsrQElBK0FvRZ2_E5cBYqOI0snrhYnSFauJ_UliwMqhtRknK1-MQF8A");
    console.log("Header value at Rest API"+this.sess.getLoggedInUser().userId);
    console.log("aUTH Header "+this.sess.getLoggedInUser().uid+" userid "+this.sess.getLoggedInUser().userId);
    header.append("uid", this.sess.getLoggedInUser().userId);
  }

    public postX(apipath, data,cn) {
    let header = new Headers();
    this.aH(header,cn);
    return this.http.post(this.url + apipath, data, { headers: header })
      .map((response: Response) => response.json());
  }

  public post(apipath, data) {
    let header = new Headers();
    this.addAuthHeader(header);
    return this.http.post(this.url + apipath, data, { headers: header })
      .map((response: Response) => response.json());
  }
  public postClass(cNX){
    let header = new Headers();
    header.append("classH",cNX );
    console.log("Class Service postClass getclassdetail "+cNX); 
    return this.http.get(this.url + '/classes/classD', { headers: header , params:cNX })
    .map((response: Response) => response.json());
  }
}
