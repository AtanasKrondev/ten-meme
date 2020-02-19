import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from '../app-routing.module';

import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavigationComponent,
    FooterComponent,
    FourOFourComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ],
  exports: [
    DashboardComponent,
    NavigationComponent,
    FooterComponent,
    FourOFourComponent,
  ]
})
export class CoreModule { }
