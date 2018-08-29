import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the ShowItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-items',
  templateUrl: 'show-items.html',
})
export class ShowItemsPage {

  items = [];
  item_key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item_key = this.navParams.get('key') as string;
    firebase.database().ref('tents/').on('value', resp => {
      this.items = [];
      this.items = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowItemsPage');
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
