import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController, IonicPage } from 'ionic-angular'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http'; 

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage { 
  usertype : string = "";
  firstname : string = ""; 
  middle : string = "";
  lastname: string = "";
  address : string = ""; 
  contact: string = "";
  email : string = ""; 
  password: string = ""; 
  birthdate: string = "";
  confirmpass: string = "";
  public showPassword: boolean = false;


  constructor(
    public navCtrl: NavController, 
  	public navParams: NavParams,
  	private modal: ModalController,
    public toastCtrl: ToastController, 
    private http: HttpClient
    ) {

  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
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
    // let emailname = this.email;
    // let emailsplit = emailname.split("@");
    // this.imagename = emailsplit[0]+'.jpg';
    // console.log(this.imagename);
    // console.log(this.imagename);

  }

 
 
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword; 
  } 

  next(){
  if(this.lastname == ""){
  const toast = this.toastCtrl.create({
    message: "Last Name is required",
    duration: 3000
  });
  toast.present();
  }else if(this.firstname == ""){
  const toast = this.toastCtrl.create({
    message: "First Name is required",
    duration: 3000
  });
  toast.present();
  }else if(this.email == ""){
  const toast = this.toastCtrl.create({
    message: "Email is required",
    duration: 3000
  });
  toast.present();
  }else if(this.contact == ""){
    const toast = this.toastCtrl.create({
    message: "Contact No. is required",
    duration: 3000
  });
  toast.present();
  }else if(this.address == ""){
    const toast = this.toastCtrl.create({
    message: "Name is required",
    duration: 3000
  });
  toast.present();
  }else if(this.password == ""){
    const toast = this.toastCtrl.create({
    message: "Password is required",
    duration: 3000
  });
  toast.present();
  }
  
  else{
      let body={
      action: 'pre_register',
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
          if(data['success']){
      
  let datas={
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
    const myModal = this.modal.create('RegisterPage', {passdata: datas});  
    this.navCtrl.pop();      
        myModal.present();
        console.log(datas);
      }else{
      const toast = this.toastCtrl.create({
      message: data['msg'],
      duration: 3000
      });
      toast.present();
      }
        });
      

      }

    
    
  }

}
