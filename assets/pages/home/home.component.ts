import { Component, NgZone, OnInit, AfterViewInit } from "@angular/core";

import { AuthService } from "../../auth/auth.service";
import { User } from "../../auth/user.model";
import { setTimeout } from "timers";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

declare var Masonry
declare var $

@Component({
	selector: 'home-page',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
	public ads: any;
	public user: User;
	public subscriptions: any[] = [];

	constructor(
		private ngZone: NgZone,
		private authservice: AuthService
	) { }

	ngOnInit() {

		let component = this;

		console.log('HomeComponent ngOnInit');
		this.subscriptions.push(this.authservice.loginStatus().subscribe((user) => {
			
			console.log('HomeComponent ngOnInit authservice', user);

			if(user) {
				console.log('logged in')
			}

			// Allow the view to be updated after login
			// https://angular.io/api/core/NgZone
			this.ngZone.run(() => {
				component.user = user;
			});
		}));
	}

	ngAfterViewInit() {

		// Masonry layout
		setTimeout(() => {
			this.refreshMasonyLayout();
		}, 1000);

		// Slow loading pages
		setTimeout(() => {
			this.refreshMasonyLayout();
		}, 4000);
		
	}

	refreshMasonyLayout() {

		let elem = document.querySelector('.grid');

		if(elem) {
			var msnry = new Masonry( '.grid', {
				itemSelector: '.grid-item'
			});
		}
	}
	
	ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}