import { Component, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

declare var $;

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class Dashboard implements AfterViewInit, OnDestroy {

	public subscriptions: any[] = [];

	constructor(
		private route: ActivatedRoute
	) { }

	ngAfterViewInit() {

		// this.subscriptions.push(this.route.params.subscribe( params => {

		// 	console.log('dashboard tab for ', params['action'])


		// 	$(document).ready(function(){
		// 		$('ul.tabs a[href="#'+params['action']+'"]').click();
		// 	});
		// }));

		// $(document).ready(function(){
		// 	$('ul.tabs').tabs();
		// });

		window.scrollTo(0, 0);
	}

	ngOnDestroy() {
		for(let i=0;i<this.subscriptions.length;i++) {
			this.subscriptions[i].unsubscribe();
		}
	  }

}