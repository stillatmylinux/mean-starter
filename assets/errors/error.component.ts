import { Component, OnInit } from "@angular/core";

import { Error } from "./error.model";
import { ErrorService } from "./error.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: 'app-error',
	templateUrl: './error.component.html',
	styles: [`
		.backdrop {
			background-color: rgba(0,0,0,0.6);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
		}
	`]
})
export class ErrorComponent implements OnInit, OnDestroy {
	error: Error;
	display = 'none';
	public subscriptions: any[] = [];

	constructor(private errorService: ErrorService) {}

	onErrorHandled() {
		this.display = 'none';
	}

	ngOnInit() {
		this.subscriptions.push(this.errorService.errorOccurred.subscribe(
			(error: Error) => {
				this.error = error;
				this.display = 'block';
			}
 		));
	}

	ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}