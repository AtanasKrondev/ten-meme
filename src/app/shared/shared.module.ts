import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    FourOFourComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [
    NavigationComponent,
    FooterComponent,
    FourOFourComponent,
  ]
})
export class SharedModule { }
