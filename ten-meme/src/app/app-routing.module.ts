import { Routes, RouterModule } from '@angular/router';
import { FourOFourComponent } from './shared/four-o-four/four-o-four.component';


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

export const AppRoutingModule = RouterModule.forRoot(routes);
