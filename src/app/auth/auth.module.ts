import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { MemeModule } from '../meme/meme.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    MemeModule,
  ],
  entryComponents: [AuthDialogComponent]
})
export class AuthModule { }
