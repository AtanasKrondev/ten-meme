import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/user/login']);
const redirectLoggedInToIndex = () => redirectLoggedInTo(['']);

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
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            },
            {
                path: 'settings',
                component: SettingsComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectUnauthorizedToLogin },
            },
            {
                path: 'login',
                component: LoginComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectLoggedInToIndex },

            },
            {
                path: 'register',
                component: RegisterComponent,
                canActivate: [AngularFireAuthGuard],
                data: { authGuardPipe: redirectLoggedInToIndex },
            }
        ]
    }
];

export const UserRoutingModule = RouterModule.forChild(routes);