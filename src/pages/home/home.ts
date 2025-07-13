import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public rows: any = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private modal: ModalController, 
  	public toastCtrl: ToastController,
  	private http: HttpClient) {
    const datas = this.navParams.get('passdata');
    console.log(datas);
  let body ={
        action: 'category'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"


      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{
      
      let rows: Array<any> = [];
      this.rows = data;
      console.log(data);
      console.log(this.rows);
      //console.log(rows);
      
    });
  }
  onActivate(data) {
    if(event.type == 'click') {
    let datas = data; 
        const myModal = this.modal.create('StocksPage', {passdata: datas});
        

        myModal.present();
        console.log(datas);
    }
 }

}
