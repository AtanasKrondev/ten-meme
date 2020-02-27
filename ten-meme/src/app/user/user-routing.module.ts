import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { GuestGuard } from '../core/guards/guest.guard';

const routes: Routes = [
    {
        path: 'user',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/user/profile'
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [GuestGuard],
            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [GuestGuard],
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);