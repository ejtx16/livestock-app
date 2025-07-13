import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalVariablesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalVariablesProvider {
  public user_id:string;
  public user_firstname:string;
  public user_lastname:string;
  public user_middlename:string;
  constructor(public http: HttpClient) {
    console.log('Hello GlobalVariablesProvider Provider');
  }

}
