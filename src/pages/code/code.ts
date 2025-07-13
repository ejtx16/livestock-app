import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, ToastController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { LoginPage } from '../login/login';
/**
 * Generated class for the CodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-code',
  templateUrl: 'code.html',
})
export class CodePage {
	public code:string;
  public codereg:string;
	public email:string;
  public usertypes:string;
  constructor(
  public navCtrl: NavController,
  public modal: ModalController, 
  public navParams: NavParams, 
  public toastCtrl: ToastController,
  private http: HttpClient ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CodePage');
    const email = this.navParams.get('email');
    const codereg = this.navParams.get('code');
    const usertypes = this.navParams.get('usertype');
    this.email = email;
    this.codereg = codereg;
    console.log(this.email);
  }
  sendcode(){

  const toast = this.toastCtrl.create({
      message: 'code',
      duration: 3000
      });
      toast.present();
    if(this.code != ""){

      let body ={
        email: this.email,
        code: this.code,
        action: 'send_code'
      };
      

      let headers : any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8" }),
          options : any = { header: headers},
          url     : any = "https://livestocksph.000webhostapp.com/phpfiles/resetpassword.php"

      this.http.post(url, JSON.stringify(body),headers).subscribe(data =>{

      if(data['success']){
      if(this.codereg == 'register'){
      const toast = this.toastCtrl.create({
      message: 'Account is Activated',
      duration: 3000
      });
      toast.present();
      console.log(data['userid']);
        this.navCtrl.push(LoginPage);
      }else{
        this.navCtrl.push(ResetPasswordPage,{email: this.email});
      }
      }else{
      var alertv = data['msg'];
      const toast = this.toastCtrl.create({
      message: alertv,
      duration: 3000
      });
      toast.present();
      }
      console.log(data['query']);
    });
    }else{
      const toast = this.toastCtrl.create({
      message: 'email is incorrect',
      duration: 3000
      });
      toast.present();
    }
  }

}
