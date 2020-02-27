import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-four-o-four',
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.scss']
})
export class FourOFourComponent {
  constructor(private _location: Location) { }

  goBack() {
    this._location.back();
  }
}
