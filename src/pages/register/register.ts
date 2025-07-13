import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
 imageURI:any;
imageFileName:any;
myphoto: string;
imagename:string ="";   
  base64Image: string;    
  images: string;
  firstname : string = ""; 
  middle : string = "";
  lastname: string = "";  
  usertype: string ="";
  birthdate: string ="";
  address : string = "";
  contact: string = "";
  email : string = ""; 
  password: string = "";
  storageDirectory:any;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private http: HttpClient,
  private camera: Camera,
  private transfer: FileTransfer,
  private file: File,
  private DomSanitizer: DomSanitizer,
  private androidPermissions: AndroidPermissions,
  public loadingCtrl: LoadingController,
  private platform: Platform,
  public toastCtrl: ToastController,
  public modal: ModalController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    const datas = this.navParams.get('passdata');
    console.log(datas['firstname']);
    this.firstname = datas['firstname'];
    this.middle = datas['middleinitial'];
    this.lastname = datas['lastname'];  
    this.usertype = datas['usertype']; 
    this.birthdate = datas['birthdate'];
    this.address = datas['address'];
    this.contact = datas['contactno'];
    this.email = datas['email'];
    this.password = datas['password'];
    let emailname = this.email;
    let emailsplit = emailname.split("@");
    this.imagename = emailsplit[0]+'.jpg';
    console.log(this.imagename);
    console.log(this.imagename);

  }

  register(){
    let body={
      action: 'register',
      firstname: this.firstname,
      middleinitial: this.middle,
      lastname: this.lastname,  
      usertype: this.usertype,
      birthdate: this.birthdate, 
      address: this.address,
      contactno: this.contact,
      email: this.email,
      password: this.password
    };

    let headers: any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8"}),
        options: any = { header: headers },
        url     : any = "http://192.168.43.163/livestockv20/phpfiles/action.php"


        this.http.post(url, JSON.stringify(body),headers).subscribe(data => {
          console.log(data);
        }); 
        
  }
  getpermission(){

  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
  result => console.log('Has permission?',result.hasPermission),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
);

this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
  }
  getImage() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

  this.camera.getPicture(options).then((imageData) => {
    this.imageURI = imageData;
  }, (err) => {
    console.log(err);
    this.presentToast(err);
  });
}
openCamera(){
    const options: CameraOptions = {
      targetHeight: 800,
      targetWidth: 400,
      quality: 100,
      cameraDirection: 1, 
    correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):  
     this.images = (<any>window).Ionic.WebView.convertFileSrc(imageData);
     this.imageURI = imageData;
    this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
    
    } 
uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imagename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'https://livestocksph.000webhostapp.com/phpfiles/fileupload.php', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      loader.dismiss();
      let body={
      action: 'register',
      firstname: this.firstname,
      middleinitial: this.middle,
      lastname: this.lastname,  
      usertype: this.usertype,
      birthdate: this.birthdate, 
      address: this.address,
      contactno: this.contact,
      email: this.email,
      password: this.password,
      image: this.imagename
    };

    let headers: any = new HttpHeaders({ 'Content-Type': "application/json; charset=UTF-8"}),
        options: any = { header: headers },
        url    : any = "https://livestocksph.000webhostapp.com/phpfiles/action.php"

        this.http.post(url, JSON.stringify(body),headers).subscribe(data => {
        if(data['success']){
          this.navCtrl.pop();
          const toast = this.toastCtrl.create({
          message: "register successful",
          duration: 3000 }); 
            toast.present();
          const myModal = this.modal.create('CodePage', {email: this.email, code: 'register'});
            myModal.present();
        }else{
        this.presentToast("Register unsuccessfull");
        console.log(data['msg']);
        console.log(data['query']);
        }
           
        });
     

    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 6000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
