import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController,ToastController } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';
/**
 * Generated class for the CheckoutProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-products',
  templateUrl: 'checkout-products.html',
})
export class CheckoutProductsPage {
  
  public rows: any = [];
  public items: any = [];
  public subtotal: number = 0;
  public total: number = 0;
  public price: any  = 0;
  public quantity: any  = 0;
  public status: string ="";
  public down: string ="";
  public rdSeller: number = 0;
  public payment: string = "";
  public downpercent: number = 0;

  constructor(
   public navCtrl: NavController, 
   public navParams: NavParams,  
   public modal: ModalController,  
   public toastCtrl: ToastController,
   public viewCtrl: ViewController,
   public global:GlobalVariablesProvider,
   private http: HttpClient
   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutProductsPage'); 
    const item = this.navParams.get('passdata');
    const selectedRD = this.navParams.get('slcRD');
    console.log(selectedRD);
     console.log(item);    
     let rows: Array<any> = [];
     this.rows = item;
     this.payment = item[0]['Payment'];
     console.log('payment: ' +this.payment);
     this.rdSeller = selectedRD;
     let body ={
        action: 'total',
        item: this.rows,
        rd: this.rdSeller
        

      };
      console.log(body);
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let items: Array<any> = [];
      this.items = data['products'];
      this.total =+ data['total'];
      this.downpercent = data['percent'];
      this.status = "1"
      console.log(this.status);

      
      
    });
     var quantity = + rows['Quantity'];
     var price = + rows['Price'];
     
     console.log(parseInt(rows['Price']));
     console.log(rows['Price']);
     console.log(this.total);
  }  

  bayadmuna(){

      if(this.total < 5000){
      const toast = this.toastCtrl.create({
    message: "Minimum of 5000 to checkout",
    duration: 3000
  });
  toast.present();
      }else if(this.down = ''){
const toast = this.toastCtrl.create({
    message: "Enter Transaction ID of Downpayment",
    duration: 3000
  });
  toast.present();
      }else{

  let body ={
        action: 'addtosold',
        item: this.items,
        status: this.status,
        down: this.down


      };
      console.log(body);
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{
      const toast = this.toastCtrl.create({
      message: data['success'],
      duration: 3000
      });
      toast.present();
      console.log(data['success']);
      console.log('query ' + data['query']);

      const mymodal = this.modal.create('RecieptPage',{passdata: this.items,total: this.total, downpercent: this.downpercent, seller: this.rdSeller});
      mymodal.present(); 

  }); 
  }
  }

  paymentMethod(){   
    
      const toast = this.toastCtrl.create({
      message: 'checkout saved',
      duration: 3000
      });
      toast.present();

 }  

 back(){
  this.viewCtrl.dismiss();
}




}
