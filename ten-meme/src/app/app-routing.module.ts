// import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './core/four-o-four/four-o-four.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/meme/recent'
  },
  {
    path: '**',
    component: FourOFourComponent,
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }

export const AppRoutingModule = RouterModule.forRoot(routes);

