import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { AddMemeComponent } from './add/add.component';
import { AuthGuard } from '../core/guards/auth.guard';

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
                canActivate: [AuthGuard],
            }
        ]
    }
];

export const MemeRoutingModule = RouterModule.forChild(routes);