import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {CustomersPage} from "../pages/customers/customers";
import {DatePipe} from "@angular/common";
import {ShowItemsPage} from "../pages/show-items/show-items";

import {Toast} from "@ionic-native/toast";
import {PriceListPage} from "../pages/price-list/price-list";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CustomersPage,
    ShowItemsPage,
    PriceListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CustomersPage,
    ShowItemsPage,
    PriceListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Toast
  ]
})
export class AppModule {}
