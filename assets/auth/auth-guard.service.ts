import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
		let url: string = state.url;

		console.log('AuthGuard this isLoggedIn: ' + this.authService.isLoggedIn());

		if( ! this.authService.isLoggedIn() ) {
			this.router.navigate(['/auth/signin']);
			return false;
		}

		return true; //this.checkLogin(url);
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
		return this.canActivate(route, state);
	}
}