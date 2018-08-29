import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import * as firebase from 'Firebase';
import { DatePipe } from '@angular/common'
import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild("name") name;
  @ViewChild("nic") nic;
  @ViewChild("number") number;
  @ViewChild("tent_2") tent_2;
  @ViewChild("tent_4") tent_4;
  @ViewChild("tent_6") tent_6;
  @ViewChild("tent_8") tent_8;
  @ViewChild("tent_16") tent_16;
  @ViewChild("bag_1") bag_1;
  @ViewChild("bag_2") bag_2;
  @ViewChild("bulb") bulb;
  @ViewChild("mattrice_1") mattrice_1;
  @ViewChild("mattrice_2") mattrice_2;

  data = {amount:0,discount:0,total:0};

  total: number;
  date: Date;
  message: string;
  subMessage: string;

  ref = firebase.database().ref('tents/');

  customers = [];
  prices_list = [];
  prices_key: string;

  count: number;
  discount: boolean;

  constructor(
    public navCtrl: NavController,
    private datepipe: DatePipe,
    private toast: Toast,
    private alertCtrl: AlertController){

    this.prices_key = '-LL33ZeLU2taFLAmcEsS';

    firebase.database().ref('tents/').on('value', resp => {
      this.customers = [];
      this.customers = snapshotToArray(resp);
    });

    firebase.database().ref("prices/").on('value', resp => {
      this.prices_list = [];
      this.prices_list = snapshotToArray(resp);
    });
  }

  calculateAmount(){
    if(!/^[0-9]+$/.test(this.number.value) || this.number.value.length !== 10) {        //check valid phone nummber
      this.message = "Invalid phone number";
      this.subMessage = "Please enter a valid phone number";
      this.alertMessage(this.message, this.subMessage);
    } else if(this.nic.value.length!=10 || (this.nic.value.charAt(this.nic.value.length-1)!='v' && this.nic.value.charAt(this.nic.value.length-1)!='V') || !/^[0-9]+$/.test(this.nic.value.substring(0,this.nic.value.length-1))) {     //check valid NIC
      this.message = "Invalid NIC number";
      this.subMessage = "Please enter a valid NIC number";
      this.alertMessage(this.message, this.subMessage);
    }
    else{
      this.count = 0;
      this.discount = false;
      for(let customer of this.customers){
        if(customer.customer_NIC.toLowerCase()==this.nic.value.toLowerCase()){
          this.count+=1;
        }
        if(this.count==2){
          console.log("true");
          this.discount = true;
          break;
        }
      }

      this.total = this.tent_2.value * this.prices_list[0].tent_2 + this.tent_4.value * this.prices_list[0].tent_4 + this.tent_6.value * this.prices_list[0].tent_6 +
        this.tent_8.value * this.prices_list[0].tent_8 + this.tent_16.value * this.prices_list[0].tent_16 + this.bag_1.value * this.prices_list[0].bag_1 +
        this.bag_2.value * this.prices_list[0].bag_2 + this.mattrice_1.value * this.prices_list[0].mattrice_1 + this.mattrice_2.value * this.prices_list[0].mattrice_2 +
        this.bulb.value * this.prices_list[0].bulb;

      this.data.total = this.total;

      if(this.discount==true){
        this.data.discount = this.total * 0.25;
        this.total = this.total - this.total * 0.25;
        this.toast.show('Congratulations!!! You have a 25% Discount', '5000', 'center').subscribe(
          toast => {
          }
        );
      }

      this.data.amount = this.total;

      this.date = new Date();
      let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');

      let newData = this.ref.push();
      newData.set({
        name: this.name.value,
        customer_NIC: this.nic.value,
        number: this.number.value,
        date: latest_date,
        payment: this.total,
        tent_2: this.tent_2.value,
        tent_4: this.tent_4.value,
        tent_6: this.tent_6.value,
        tent_8: this.tent_8.value,
        tent_16: this.tent_16.value,
        bag_1: this.bag_1.value,
        bag_2: this.bag_2.value,
        mattrice_1: this.mattrice_1.value,
        mattrice_2: this.mattrice_2.value,
        bulb: this.bulb.value
      });

      this.alertMessage("Successfully added the Record","");
    }

  }

  alertMessage(message: string, subMessage: string){
    let alert = this.alertCtrl.create({
      title: message,
      subTitle: subMessage,
      buttons: ['Ok']
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
