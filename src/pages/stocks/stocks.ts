import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, IonicPage,ViewController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the StocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stocks',
  templateUrl: 'stocks.html',
})
export class StocksPage {
public rows: any = [];
public temp: any = [];
public cond: string ="";

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private modal: ModalController, 
  	public toastCtrl: ToastController, 
    public viewCtrl: ViewController,
  	private http: HttpClient) {
    console.log("stocks_page");
    const catego = this.navParams.get('passdata');
    console.log(catego);  
    this.cond = catego['Category'];
    console.log(this.cond);
  let body ={
        action: 'stocksWcon',
        condition: this.cond
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"


      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{
      let rows: Array<any> = [];
      let temp: Array<any> = [];
      this.rows = data;
      this.temp = data;
      console.log(data);
      console.log(this.rows);
      console.log(this.temp);
      //console.log(rows);
      
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.Sub_Category.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    
  } 

  buyProduct(data){ 

    if(event.type == 'click') {
    let datas = data; 
        console.log(datas);
        const mymodal = this.modal.create('BuyProductPage', {passdata: datas}); 
        mymodal.present(); 
    }
    
    
  } 


  back(){
    this.viewCtrl.dismiss();
  } 


}
