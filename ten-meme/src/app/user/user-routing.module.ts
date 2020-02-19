import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

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
            },
            {
                path: 'settings',
                component: SettingsComponent,
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);