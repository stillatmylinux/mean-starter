import { Component, OnInit, isDevMode, Renderer2 } from '@angular/core';

import { AuthService } from "./auth.service";
import { User } from './user.model';
import { environment } from "../config/environments";
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
	selector: 'google-button',
	template: `<div id="gSignInWrapper" (click)="googleSignin()">
					<div id="customBtn" class="customGPlusSignIn">
						<span class="icon"></span>
						<span class="buttonText">Signin with Google</span>
					</div>
				</div>`
})
export class GoogleButtonComponent implements OnInit, OnDestroy {

	private url: string;
	private loggedin: User;
	public subscriptions: any[] = [];

	constructor(
		private renderer: Renderer2,
		private authService: AuthService
	) { 
		this.url = ((isDevMode()) ? environment.dev_url : environment.prod_url) + '/google/signin';
		this.renderer.listen('window', 'message', this.handleMessage.bind(this));
	}

	ngOnInit() {
		this.subscriptions.push( this.authService.loginStatus().subscribe((user) => {
            // console.log('GoogleButtonComponent.loginStatus.subscribe.loggedin?', user);
        }));
	}

	handleMessage(event: Event) {
		console.log('got your message', (<any>event).data);

		if((<any>event).data) {
			
			var jsonObject = JSON.parse((<any>event).data);
			// console.log(jsonObject, jsonObject.token, this.parseJwt(jsonObject.token)); 
			let jwt = this.authService.parseJwt(jsonObject.token);

			const login = {
				message: 'Welcome back',
				token: jsonObject.token,
				userId: jsonObject.userId
			};

			let user = new User(jwt.user.email, '', jwt.user.firstName, jwt.user.lastName);

			this.authService.updateLogin(login, user);
			if(jsonObject.token) {
			}
		}
	}

	googleSignin() {
		const win_opener = window.open(this.url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
	}

	ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }

}