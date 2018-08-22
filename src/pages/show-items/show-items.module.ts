import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowItemsPage } from './show-items';

@NgModule({
  declarations: [
    ShowItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowItemsPage),
  ],
})
export class ShowItemsPageModule {}
