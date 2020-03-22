import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { MemeRoutingModule } from './meme-routing.module';
import { CommentModule } from '../comment/comment.module';

import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { AddMemeComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';
import { RecentComponent } from './recent/recent.component';
import { MostLikedComponent } from './most-liked/most-liked.component';
import { NsfwComponent } from './nsfw/nsfw.component';

@NgModule({
  declarations: [
    CardComponent,
    ListComponent,
    DetailsComponent,
    AddMemeComponent,
    SearchComponent,
    RecentComponent,
    MostLikedComponent,
    NsfwComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CommentModule,
    MemeRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    ListComponent,
    DetailsComponent,
    AddMemeComponent,
  ]
})
export class MemeModule { }
