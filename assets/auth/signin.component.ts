import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit, OnDestroy {
	myForm: FormGroup;
	public subscriptions: any[] = [];

	constructor(private authService: AuthService) {}

	onSubmit() {
		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password
		);
		this.subscriptions.push(this.authService.signIn(user).subscribe(
			data => {
				
				const login = {
					message: 'Welcome back',
					token: data.token,
					userId: data.userId
				};

				let user = new User(data.email, '', data.firstName, data.lastName, data.image);

				this.authService.updateLogin(login, user);
				
			},
			error => console.error(error)
		));
		this.myForm.reset();
	}

	ngOnInit() {
		this.myForm = new FormGroup({
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required),
		});
	}

	testSession() {
		console.log('SigninComponent.testSession');
		this.authService.testSession();
	}

	ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}