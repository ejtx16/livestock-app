import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home'; 
// import { MainPage } from '../pages/main/main'; 
import { LoginPage } from '../pages/login/login';  
// import { BuyProductPage} from '../pages/buy-product/buy-product';    
//import { RecieptPage} from '../pages/reciept/reciept';   

import { ForgotPassPage } from '../pages/forgot-pass/forgot-pass'; 
import { ResetPasswordPage } from '../pages/reset-password/reset-password';  
import { RegisteruserPage} from '../pages/registeruser/registeruser'; 
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { GlobalVariablesProvider } from '../providers/global-variables/global-variables';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { IonicStorageModule } from '@ionic/Storage'; 

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    // MainPage,
    LoginPage,
    ForgotPassPage,
    ResetPasswordPage,
    RegisteruserPage,
    //RecieptPage
   
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp), 
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    // MainPage,
    LoginPage,
    ForgotPassPage,
    ResetPasswordPage,
    RegisteruserPage,  
    //RecieptPage


   
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    GlobalVariablesProvider,
    Camera,
    File,
    FilePath,
    FileChooser,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
