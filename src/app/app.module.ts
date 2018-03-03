import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SessionManagerProvider } from '../providers/session-manager/session-manager';
import { RestClientService } from '../providers/rest-client/rest-client';
import { HttpModule } from '@angular/http';
import { CSocietyPage } from "../pages/c-society/c-society";
import { ChatAppPage } from "../pages/chat-app/chat-app";
import { ConversationServiceProvider } from '../providers/conversation-service/conversation-service';
import { MRequestPage } from "../pages/m-request/m-request";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DashboardPage,
    CSocietyPage,
    ChatAppPage,
    MRequestPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    CSocietyPage,
    ChatAppPage,
    MRequestPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SessionManagerProvider,
    RestClientService,
    ConversationServiceProvider,
    ConversationServiceProvider,
  ]
})
export class AppModule {}
