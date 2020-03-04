import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentFormComponent } from './comment-form/comment-form.component';

@NgModule({
  declarations: [CommentCardComponent, CommentFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [CommentCardComponent, CommentFormComponent],
})
export class CommentModule { }
