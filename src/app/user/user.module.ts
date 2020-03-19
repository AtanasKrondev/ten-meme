import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { UserRoutingModule } from './user-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MemeModule } from '../meme/meme.module';
import { CommentModule } from '../comment/comment.module';

import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [ProfileComponent, SettingsComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule,
    AuthModule,
    MemeModule,
    CommentModule,
  ]
})
export class UserModule { }
