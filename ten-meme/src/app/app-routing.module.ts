import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component'
import { AddMemeComponent } from './add-meme/add-meme.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recent'
  },
  {
    path: 'recent',
    component: ListComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
  {
    path: 'add',
    component: AddMemeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
