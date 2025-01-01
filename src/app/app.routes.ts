import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: 'home',
        pathMatch: 'full',
        loadComponent: () => import('./components/home/home.component').then((m) => m.HomeComponent),
    }, 
    {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent),
        //component: SignupComponent,
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'site-list',
        loadComponent: () => import('./pages/site-list/site-list.component').then((m) => m.SiteListComponent),    
        canActivate: [authGuard]    
    },
    {
        path: 'password-list',
        loadComponent: () => import('./pages/password-list/password-list.component').then((m) => m.PasswordListComponent),   

    },
        // {
    //     path: 'features',
    //     loadComponent: () => import('./components/features/features.component').then((m) => m.FeaturesComponent),
    // },
];
