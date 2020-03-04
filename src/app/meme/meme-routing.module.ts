import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { AddMemeComponent } from './add/add.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/user/login']);

const routes: Routes = [
    {
        path: 'meme',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/meme/recent'
            },
            {
                path: 'recent',
                component: ListComponent
            },
            {
                path: 'details',
                component: DetailsComponent,
            },
            {
                path: 'add',
                component: AddMemeComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            }
        ]
    }
];

export const MemeRoutingModule = RouterModule.forChild(routes);