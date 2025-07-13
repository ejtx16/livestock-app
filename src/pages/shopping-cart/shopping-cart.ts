import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, ToastController, ViewController, IonicPage } from 'ionic-angular';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';
/**
 * Generated class for the ShoppingCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {
  
  public rows: any = [];
  public sellers: any = [];
  selection: number=0;
  selectedArray :any = [];
  subtotal: number = 0;
  quantity : number = 0;
  price: number= 0;

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
    console.log('ionViewDidLoad ShoppingCartPage');
    let body ={
        action: 'mycart',
        id: this.global.user_id
        

      };
      console.log(body);
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      let rows: Array<any> = [];
      this.rows = data['products'];
      let sellers: Array<any> = [];
      this.sellers = data['seller'];
      console.log(this.rows);
         
      
      
    });
  } 
checkAll(){
  for(let i =0; i <= this.rows.length; i++) {
    this.rows[i].checked = true;
  }
 console.log(this.rows);
}

selectItem(data){
 if (data.checked == true) {
    this.selectedArray.push(data);
  } else {
   let newArray = this.selectedArray.filter(function(el) {
     return el.Product_ID !== data.Product_ID;
  });
   this.selectedArray = newArray;
 }
 console.log(this.selectedArray);
}

  back(){
    this.viewCtrl.dismiss();
  } 

  checkOut(){
  if(this.selection == 0){
  const toast = this.toastCtrl.create({
    message: 'Please select Seller',
    duration: 3000
  });
  toast.present();

  }else{  
    
    console.log(this.selectedArray);
    let datas = this.selectedArray; 
        console.log(datas);
        const mymodal = this.modal.create('CheckoutProductsPage', {passdata: datas, slcRD: this.selection}); 
        mymodal.present(); 
}

 }



 removeItem(){   
    
    
     console.log('removeItem');
     console.log(this.selectedArray);
    let body ={
        action: 'removeItem',
        item: this.selectedArray

      };
      console.log(body);
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url,JSON.stringify(body),headers).subscribe(data =>{

      console.log(data['success']);      
      
    });

 }

}
