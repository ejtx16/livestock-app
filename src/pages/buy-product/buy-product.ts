import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';
/**
 * Generated class for the BuyProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buy-product',
  templateUrl: 'buy-product.html',
})
export class BuyProductPage { 

 quantity : number = 0;
 stock: number = 0;
 description : string ="";
  sub_category : string ="";
  product_image: string="";
  price: string="";
  product_ID: number = 0;
  seller_ID: number = 0;
  kilo: number = 0; 

  


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private modal: ModalController, 
    public toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public global:GlobalVariablesProvider,
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyProductPage');
     const item = this.navParams.get('passdata');
     console.log(item);
     this.description = item.Description;
     this.sub_category = item.Sub_Category;
     this.stock = item.Stock;
     this.product_image = item.Product_Image;
     this.price = item.Price;
     this.kilo = item.Kilo;
     this.product_ID = item.Product_Id;
     this.seller_ID = item.User_ID;
  }  

  addToShoppingCart(){ 

    
    let body ={
        action: 'addtocart',
        item: this.product_ID,
        seller: this.seller_ID,
        buyer: this.global.user_id,
        price: this.price,
        quantity: this.quantity,
        status: 0


      };
      console.log(body);
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{
      if(data['success']) {
      const mymodal = this.modal.create('ShoppingCartPage');
    mymodal.present(); 
    this.viewCtrl.dismiss();}
    else {
     const toast = this.toastCtrl.create({
      message: 'bonak hindi gumana',
      duration: 3000
      });
      toast.present();
    }
      
    });
    }

      
  
  viewShoppingCart(){ 

    const mymodal = this.modal.create('ShoppingCartPage');
    mymodal.present();  
    this.viewCtrl.dismiss();
  
  }   



  back(){
    this.viewCtrl.dismiss();
  }

  plus() {  
    
    if(this.quantity <= 100) {
      this.quantity++;
    }

  } 

  minus() {  

    if(this.quantity >= 1) {
      this.quantity--;
   } 

  } 



}
