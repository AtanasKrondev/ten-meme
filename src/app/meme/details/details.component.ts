import { Component } from '@angular/core';
import { Location } from '@angular/common'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  constructor(private _location: Location) { }

  goBack() {
    this._location.back();
  }
}
