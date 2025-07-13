import { Component } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, NavParams, ToastController, IonicPage } from 'ionic-angular'; 
import { RegisterPage } from '../register/register'; 
import { MainPage } from '../main/main';  

/**
 * Generated class for the RegisteruserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registeruser',
  templateUrl: 'registeruser.html',
})
export class RegisteruserPage { 

  usertype: string = ""; 
  // firstname : string = ""; 
  // middle : string = "";
  // lastname: string = "";
  // address : string = "";
  // contact: string = "";
  // email : string = ""; 
  // password: string = ""; 
  // birthdate: string = "";
  // confirmpass: string = "";
  public showPassword: boolean = false;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private modal: ModalController,
    public toastCtrl: ToastController, 
    private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisteruserPage');
  }  

  next(){
    // if(this.lastname == ""){
    // const toast = this.toastCtrl.create({
    //   message: "Last Name is required",
    //   duration: 3000
    // });
    // toast.present();
    // }else if(this.firstname == ""){
    // const toast = this.toastCtrl.create({
    //   message: "First Name is required",
    //   duration: 3000
    // }); 
    // toast.present();
    // }else if(this.usertype == ""){
    //   const toast = this.toastCtrl.create({
    //   message: "Usertype is required",
    //   duration: 3000
    // });
    // toast.present();
    // }else if(this.email == ""){
    // const toast = this.toastCtrl.create({
    //   message: "Email is required",
    //   duration: 3000
    // });
    // toast.present();
    // }else if(this.contact == ""){
    //   const toast = this.toastCtrl.create({
    //   message: "Contact No. is required",
    //   duration: 3000
    // });
    // toast.present();
    // }else if(this.address == ""){
    //   const toast = this.toastCtrl.create({
    //   message: "Name is required",
    //   duration: 3000
    // });
    // toast.present();
    // }else if(this.password == ""){
    //   const toast = this.toastCtrl.create({
    //   message: "Password is required",
    //   duration: 3000
    // });
    // toast.present(); 
    // } 

    if(this.usertype == ""){
        const toast = this.toastCtrl.create({
        message: "Usertype is required",
        duration: 3000
      });
      toast.present();
      }
    
    else{
      
    let datas={
      
        usertype: this.usertype,
        
      };
      const myModal = this.modal.create('MainPage', {passdata: datas});  
      this.navCtrl.pop();      
          myModal.present();
          console.log(datas);
       
  
        }
  
      
      
    }
  
  



}
