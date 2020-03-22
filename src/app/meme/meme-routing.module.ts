import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { AddMemeComponent } from './add/add.component';
import { SearchComponent } from './search/search.component';
import { NsfwComponent } from './nsfw/nsfw.component';
import { MostLikedComponent } from './most-liked/most-liked.component';
import { RecentComponent } from './recent/recent.component';

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
                component: RecentComponent,
            },
            {
                path: 'liked',
                component: MostLikedComponent,
            },
            {
                path: 'nsfw',
                component: NsfwComponent,
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
            {
                path: 'search/:search',
                component: SearchComponent,
            },
        ]
    }
];

export const MemeRoutingModule = RouterModule.forChild(routes);