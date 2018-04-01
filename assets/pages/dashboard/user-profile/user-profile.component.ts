import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from "../../../auth/auth.service";
import { User } from '../../../auth/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public subscriptions: any[] = [];

  constructor(
    private ngZone: NgZone,
    private authService: AuthService
  ) { }

  ngOnInit() {

    let component = this;

    this.user = this.authService.checkLoginStorage();

        this.subscriptions.push( this.authService.loginStatus().subscribe((user) => {

            // Allow the view to be updated after login
            // https://angular.io/api/core/NgZone
            this.ngZone.run(() => {
                component.user = user;
            });
        }) );
  }

  ngOnDestroy() {
    for(let i=0;i<this.subscriptions.length;i++) {
        this.subscriptions[i].unsubscribe();
    }
  }

}
