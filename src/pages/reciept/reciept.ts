import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,ToastController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

/**
 * Generated class for the RecieptPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reciept',
  templateUrl: 'reciept.html',
})
export class RecieptPage {
  public items: any = [];
  public subtotal: number;
  public subtotaldown: number; 
  public seller: number;
  public farmname: string;
  public firstName: string;
  public lastName: string;
  public vat: number;
  public total: number;
  public other: number = 200;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,  
    public modal: ModalController,  
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public global:GlobalVariablesProvider,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecieptPage');
    const item = this.navParams.get('passdata');
    const total = this.navParams.get('total');
    const downpercent = this.navParams.get('downpercent');
    const seller = this.navParams.get('seller');
    this.items = item;
    this.subtotal = total;
    this.vat = this.subtotal * 0.12;
    this.total = this.vat + this.subtotal + this.other;
    this.subtotaldown = downpercent;
    this.seller = seller;

    let body ={
      action: 'farmname',
      ID: this.seller

    };
    console.log(body);
    let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
        options : any = { header: headers},
        url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

    this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{
      this.farmname = data['farmName'];
      this.lastName = data['lastName'];
      this.firstName = data['firstName'];
      console.log(data['query']);
    });

  }   

  done(){ 

    const mymodal = this.modal.create('StatusPage');
    mymodal.present();  
    this.viewCtrl.dismiss();
  
  }   



}
