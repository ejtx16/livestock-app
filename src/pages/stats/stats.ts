import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,ToastController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

/**
 * Generated class for the StatsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
	  public rows: any = [];
	  public total: number = 0;
  constructor( public navParams: NavParams,  
   public modal: ModalController,  
   public toastCtrl: ToastController,
   public viewCtrl: ViewController,
   public global:GlobalVariablesProvider,
   private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
    const item = this.navParams.get('passdata');
     console.log(item);    
     let body ={
      transaction: item,
        action: 'getter'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"


      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let rows: Array<any> = [];
     	this.rows = data['products'];
     	this.total =+ data['total'];
      console.log(this.rows);
      
   
    });
     
  } 

  
  back(){
    this.viewCtrl.dismiss();
  } 


}
