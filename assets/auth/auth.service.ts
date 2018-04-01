import { Injectable, isDevMode, NgZone } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";
import { environment } from "../config/environments";

@Injectable()
export class AuthService implements OnDestroy {

	public domain: string;
	private loggedinObs = new Subject<User>();
	public user: User;
	public subscriptions: any[] = [];

	constructor(
		private http: HttpClient,
		private errorService: ErrorService,
		private ngZone: NgZone,
		private router: Router
	) {

		this.domain = isDevMode() ? environment.dev_url : environment.prod_url;

		this.checkLoginStorage();

		// Set login status
		if(this.isLoggedIn()) {
			this.loggedinObs.next(this.user);
		}
		else {
			this.loggedinObs.next(null);
		}
	}
	
	signUp(user: User) {
		const body = JSON.stringify(user);
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		// Angular 5
		return this.http.post(this.domain + '/user', body, {headers: headers});
	}
	
	signIn(user: User) {
		const body = JSON.stringify(user);
		const headers = new HttpHeaders({'Content-Type': 'application/json'});
		// Angular 5
		return this.http.post<any>(this.domain + '/user/signin', body, {headers: headers});
	}

	testSession() {
		console.log('AuthService.testSession', this.domain + '/user/test/session');
		const body = JSON.stringify({message: 'what'});
		const headers = new HttpHeaders().set('Content-Type', 'application/json');
		// Angular 5
		return this.http.post(this.domain + '/user/test/session', body, {headers: headers})
	}

	logout() {
		this.subscriptions.push(this.http.get(this.domain + '/user/logout').subscribe((data) => {

			this.user = null;

			localStorage.clear();
			this.loggedinObs.next(null);
		}));
	}

	checkLoginStorage() {
		let token = localStorage.getItem('token');
		if(token) {
			let parsedToken = this.parseJwt(token);
			console.log('parsedToken', parsedToken);
			if(parsedToken.user) {
				console.log('Google token', parsedToken.user);
				let user = parsedToken.user;
				this.user = new User(user.email, '', user.firstName, user.lastName);
				this.loggedinObs.next(this.user);
			} else if(parsedToken.firstName) {
				console.log('local user token', parsedToken);
				let user = parsedToken;
				this.user = new User(user.email, '', user.firstName, user.lastName);
				this.loggedinObs.next(this.user);
			}
			return this.user;
		}
		
		console.log('no token');
	}

	parseJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	};

	isLoggedIn() {
		return (this.user) ? true : false;
	}

	getUser() {
		return this.user;
	}

	getUserId() {
		return localStorage.getItem('userId');
	}

	updateLogin(login: {message,token,userId}, user: User) {

		if(login) {
			localStorage.setItem('token', login.token);
			localStorage.setItem('userId', login.userId);
			this.user = user;
			this.loggedinObs.next(user);
			this.ngZone.run( () => {
				let loginRedirect = localStorage.getItem('loginRedirect');
				if(loginRedirect) {
					let paths = JSON.parse(loginRedirect);
					let url = [];
					paths.forEach(path => {
						url.push(path.path);
					});
					this.router.navigate(url);
					localStorage.removeItem('loginRedirect');
				} else {
					this.router.navigateByUrl('/');
				}
			});
		} else {
			this.logout();
		}
	}

	loginStatus() {
		// return the observable
		return this.loggedinObs;
	}

	ngOnDestroy() {
		for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
	}
}