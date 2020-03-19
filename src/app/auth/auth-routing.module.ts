import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const redirectLoggedInToIndex = () => redirectLoggedInTo(['']);

const routes: Routes = [
    {
        path: 'auth',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: '/auth/login'
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

export const AuthRoutingModule = RouterModule.forChild(routes);