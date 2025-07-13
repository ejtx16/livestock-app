import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/Storage';
import { GlobalVariablesProvider } from '../../providers/global-variables/global-variables';

import { RegisteruserPage } from '../registeruser/registeruser';
import { MainPage } from '../main/main';
import { HomePage } from '../home/home';
import { ForgotPassPage } from '../forgot-pass/forgot-pass';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string ="";
  password: string ="";  
  public showPassword: boolean = false;

  constructor(
  public navCtrl: NavController,
  private modal: ModalController,  
  public navParams: NavParams, 
  private http: HttpClient,
  public toastCtrl: ToastController,
  public global:GlobalVariablesProvider,
  private storage: Storage) {
  }

  LogIn(){
  const toast = this.toastCtrl.create({
      message: 'sure win',
      duration: 3000
      });
    if(this.email != "" && this.password != ""){
      let body ={
        email: this.email,
        password: this.password,
        action: 'login'
      };
      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"

      this.http.post(url, JSON.stringify(body),headers).subscribe(data =>{
      
      if(data['success']) {
      const toast = this.toastCtrl.create({
      message: "login successful"+data['result']['Email'],
      duration: 3000
      }); 
      toast.present();
      this.storage.set('session_storage','login');
      this.navCtrl.setRoot(HomePage);
      this.global.user_lastname = data['result']['Last_Name'];
      this.global.user_firstname = data['result']['First_Name'];
      this.global.user_middlename = data['result']['Middle_Name'];
      this.global.user_id = data['result']['User_ID'];
      }else{
      console.log(data['query']);
      const toast = this.toastCtrl.create({
      message: data['msg'],
      duration: 3000
      });
      toast.present();
      if(data['check']== 'email'){
       const myModal = this.modal.create('CodePage', {email: this.email, code: 'register'});
            myModal.present();
      }
      }
    });
    }else{
      const toast = this.toastCtrl.create({
      message: 'username or password is incorrect',
      duration: 3000
      });
      toast.present();
    }
  }
  SignUp(){
  this.navCtrl.setRoot(RegisteruserPage);
  }
  ForgotPass(){
  this.navCtrl.setRoot(ForgotPassPage); 
  } 

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword; 
  } 


}
