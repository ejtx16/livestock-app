import { Component, Input } from '@angular/core';

/**
 * Generated class for the IcInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ic-input',
  templateUrl: 'ic-input.html'
})
export class IcInputComponent {

  @Input() type: string ="text";
  @Input() placeholder: string =''; 

  constructor() {

  }

}
