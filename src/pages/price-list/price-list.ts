import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the PriceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price-list',
  templateUrl: 'price-list.html',
})
export class PriceListPage {

  ref = firebase.database().ref('prices/');
  prices_key: string;

  prices = [];

  data = { t2:0,t4:0,t6:0,t8:0,t16:0,s1:0,s2:0,m1:0,m2:0,bulb:0 };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

    firebase.database().ref('prices/').on('value', resp => {
      this.prices = [];
      this.prices = snapshotToArray(resp);
    });
    this.data.t2 = this.prices[0].tent_2;
    this.data.t4 = this.prices[0].tent_4;
    this.data.t6 = this.prices[0].tent_6;
    this.data.t8 = this.prices[0].tent_8;
    this.data.t16 = this.prices[0].tent_16;
    this.data.s1 = this.prices[0].bag_1;
    this.data.s2 = this.prices[0].bag_2;

    this.data.m1 = this.prices[0].mattrice_1;
    this.data.m2 = this.prices[0].mattrice_2;
    this.data.bulb = this.prices[0].bulb;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriceListPage');
  }

  alertMessage(message: string){
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  changePrices(){
    this.prices_key = '-LL33ZeLU2taFLAmcEsS';
    let alert = this.alertCtrl.create({
      title: 'Confirm Price Update',
      message: 'Do you want to update the prices?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Update',
          handler: () => {
            const postData = {
              tent_2: this.data.t2,
              tent_4: this.data.t4,
              tent_6: this.data.t6,
              tent_8: this.data.t8,
              tent_16: this.data.t16,
              bag_1: this.data.s1,
              bag_2: this.data.s2,
              mattrice_1: this.data.m1,
              mattrice_2: this.data.m2,
              bulb: this.data.bulb
            };

            this.alertMessage("Successfully Updated the Prices");

            const personRef = firebase.database().ref().child("prices").child(this.prices_key);

            personRef.once('value', function (snapshot) {
              if(snapshot.val() === null){
                console.log("Doesn't Exist");
              }else{
                personRef.update(postData);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

