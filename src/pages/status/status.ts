import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,ToastController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';
/**
 * Generated class for the StatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

   public downRows: any = [];
   public shipRows: any = [];
   public receiveRows: any = [];
   public completeRows: any = [];

  constructor(public navCtrl: NavController, 
   public navParams: NavParams,  
   public modal: ModalController,  
   public toastCtrl: ToastController,
   public viewCtrl: ViewController,
   public global:GlobalVariablesProvider,
   private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  down(){
  let body ={
      to: this.global.user_id,
        action: 'downheader'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"


      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let downRows: Array<any> = [];
      this.downRows = data;
      console.log(downRows);
      
      const toast = this.toastCtrl.create({
      message: data[0]['Last_Name'],
      duration: 3000
      }); 
      //toast.present();
   
    });

  }

  ship(){
  let body ={
      to: this.global.user_id,
        action: 'shipheader'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let shipRows: Array<any> = [];
      this.shipRows = data;
      console.log(shipRows);
      
      const toast = this.toastCtrl.create({
      message: data[0]['Last_Name'],
      duration: 3000
      }); 
      //toast.present();
   
    });

  }

  receive(){
  let body ={
      to: this.global.user_id,
        action: 'receiveheader'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let receiveRows: Array<any> = [];
      this.receiveRows = data;
      console.log(receiveRows);
      
      const toast = this.toastCtrl.create({
      message: data[0]['Last_Name'],
      duration: 3000
      }); 
      //toast.present();
   
    });

  }

  complete(){
  let body ={
      to: this.global.user_id,
        action: 'completeheader'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let completeRows: Array<any> = [];
      this.completeRows = data;
      console.log(completeRows);
      
      const toast = this.toastCtrl.create({
      message: data[0]['Last_Name'],
      duration: 3000
      }); 
      //toast.present();
   
    });

  }

  onActivate(sad){
    if(event.type == 'click') {
    let datas = sad.ID;
    console.log(datas);
    console.log(sad.ID);
    const myModal = this.modal.create('StatsPage',{passdata: datas});

        myModal.present();
        console.log('datas');
        console.log(datas);


}
} 
		
  back(){
    this.viewCtrl.dismiss();
  } 

}
