import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { CommentComponent } from './comment-card/comment.component';
import { CommentFieldComponent } from './comment-field/comment-field.component';

@NgModule({
  declarations: [CommentComponent, CommentFieldComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [CommentComponent, CommentFieldComponent],
})
export class CommentModule { }
