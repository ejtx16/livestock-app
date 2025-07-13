import { Component, ViewChild } from '@angular/core';
import { Platform, NavController,Nav, MenuController,ModalController, MenuToggle,IonicPage, ToastController, LoadingController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/Storage';
import { MainPage } from '../pages/main/main'; 
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';   
import { RegisterPage} from '../pages/register/register';   
//import { RecieptPage } from '../pages/reciept/reciept';   

// import { BuyProductPage} from '../pages/buy-product/buy-product';   


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav; 
  rootPage:any = LoginPage; 

  constructor(
  public platform: Platform, 
  public statusBar: StatusBar, 
  public splashScreen: SplashScreen,
  public modal: ModalController,
  public toastCtrl: ToastController,  
  private storage: Storage) {
  this.platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }
statusPage(){
const mymodal = this.modal.create('StatusPage');
      mymodal.present(); 
  }
  cartPage(){
const mymodal = this.modal.create('ShoppingCartPage');
    mymodal.present(); 
  }
  signOut(){
      this.storage.clear();
      this.nav.setRoot(LoginPage);
      const toast = this.toastCtrl.create({
            message: "Logout Successfully",
            duration: 3000
        }); 
        toast.present();
    }
}

