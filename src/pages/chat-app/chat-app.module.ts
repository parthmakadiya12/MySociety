import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatAppPage } from './chat-app';

@NgModule({
  declarations: [
    ChatAppPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatAppPage),
  ],
})
export class ChatAppPageModule {}
