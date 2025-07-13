import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular'; 
import { ResetPasswordPage } from '../reset-password/reset-password';    
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Generated class for the ForgotPassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-pass',
  templateUrl: 'forgot-pass.html',
})
export class ForgotPassPage {
  email: string ="";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: HttpClient,
    public toastCtrl: ToastController,
    public modal: ModalController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPassPage');
  }  

  forgotPass(){

    let body ={
      email: this.email,
      action: 'forgot'
    };
    let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
        options : any = { header: headers},
        url     : any = "https://livestocksph.000webhostapp.com/phpfiles/resetpassword.php"

    this.http.post(url, JSON.stringify(body),headers).subscribe(data =>{
    
    if(data['success']){
    const toast = this.toastCtrl.create({
    message: "code sent successful",
    duration: 3000
    }); 
    toast.present();
    const myModal = this.modal.create('CodePage', {email: this.email, code: 'forgot'});
          myModal.present();
    }else{
    console.log(data['query']);
    const toast = this.toastCtrl.create({
    message: data['msg'],
    duration: 3000
    });
    toast.present();
    }
  });
  }





}
