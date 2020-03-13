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
                path: 'add',
                component: AddMemeComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            },
            {
                path: 'details/:id',
                component: DetailsComponent,
            },
        ]
    }
];

export const MemeRoutingModule = RouterModule.forChild(routes);