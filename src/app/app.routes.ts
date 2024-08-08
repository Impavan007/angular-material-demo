import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SigninComponent },
    { path: 'homepage', component: HomepageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, 
    { path: '**', component: NotFoundComponent },
];
