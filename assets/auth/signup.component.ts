import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
	myForm: FormGroup;
	public subscriptions: any[] = [];

	constructor(private authService: AuthService) {}

	onSubmit() {
		const user = new User(
			this.myForm.value.email,
			this.myForm.value.password,
			this.myForm.value.firstName,
			this.myForm.value.lastName,
		);

		this.subscriptions.push(this.authService.signUp(user).subscribe(
			data => console.log(data),
			error => console.error(error)
		));
		this.myForm.reset();
	}

	ngOnInit() {
		this.myForm = new FormGroup({
			firstName: new FormControl(null, Validators.required),
			lastName: new FormControl(null, Validators.required),
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]),
			password: new FormControl(null, Validators.required),
		});
	}

	ngOnDestroy() {
        for(let i=0;i<this.subscriptions.length;i++) {
            this.subscriptions[i].unsubscribe();
        }
    }
}