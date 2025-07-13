import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoginPage } from '../login/login';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string =''; 
  password: string = "";
  conpass: string ="";

  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient, 
    private toastCtrl: ToastController
    
    ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
    const email = this.navParams.get('email');
    this.email = email;   
    
  }

  resetPass(){
    if(this.password == this.conpass){
      let body ={
        email: this.email,
        pass: this.password,
        action: 'reset_pass'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "https://livestocksph.000webhostapp.com/phpfiles/resetpassword.php"
  
      this.http.post(url, JSON.stringify(body),headers).subscribe(data =>{
        if(data['success']){
          const toast = this.toastCtrl.create({
            message: data['msg'],
            duration: 3000
            }); 
            toast.present();
            this.navCtrl.push(LoginPage)
  
        }else{
          const toast = this.toastCtrl.create({
            message: data['msg'],
            duration: 3000
            }); 
            toast.present();
        }
  
      });
    }else {
      const toast = this.toastCtrl.create({
        message: 'Password didn\'t Match',
        duration: 3000
        }); 
        toast.present();
    }
    
  }

}
