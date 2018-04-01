import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { HomeComponent } from "../pages/home/home.component";
import { PageNotFound } from "../pages/404/404.component";
import { AuthenticationComponent } from "../auth/authentication.component";
import { Dashboard } from "../pages/dashboard/dashboard.component";
import { AuthGuardService } from "../auth/auth-guard.service";
import { UserProfileComponent } from "../pages/dashboard/user-profile/user-profile.component";

const routes: Routes = [
	{ path: 'dashboard', component: Dashboard, canActivate: [AuthGuardService], children: [
		// https://www.nativescript.org/blog/using-nested-router-outlets-with-nativescript-and-angular
		// { path: '', redirectTo: '/dashboard/(dashoutlet:ads)', pathMatch: 'full' },	
		{path: 'profile', component: UserProfileComponent, outlet: 'dashoutlet'},
	] },
	{ path: 'auth', component: AuthenticationComponent, loadChildren: '../auth/auth.module#AuthModule' },

	{ path: '', component: HomeComponent },
	{ path: '**', component: PageNotFound }
];

export const routing = RouterModule.forRoot(routes);