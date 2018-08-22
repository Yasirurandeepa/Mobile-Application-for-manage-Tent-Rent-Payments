import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';
import {ShowItemsPage} from "../show-items/show-items";


/**
 * Generated class for the CustomersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {

  customers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    firebase.database().ref('tents/').on('value', resp => {
      this.customers = [];
      this.customers = snapshotToArray(resp);
      this.customers.reverse();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersPage');
  }

  showItems(customer_key: string){
    this.navCtrl.push(ShowItemsPage, {key: customer_key});
  }

  deleteItem(customer_key: string){
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete this item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            const personRef = firebase.database().ref().child("tents").child(customer_key);

            personRef.once('value', function (snapshot) {
              if(snapshot.val() === null){
                console.log("Doesn't Exist");
              }else{
                personRef.remove();
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
